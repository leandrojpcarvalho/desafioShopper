import { ConfirmRideType, EstimateRequestType } from "./components/types";
import ValidateFields from "./entities";

enum Method {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
}

enum EndPoints {
    RIDE = '/ride',
    RIDE_ESTIMATE = '/ride/estimate',
    RIDE_CONFIRM = '/ride/confirm',
}

interface FetchOptions {
    endPoints: keyof typeof EndPoints;
    method: keyof typeof Method;
    body?: EstimateRequestType | ConfirmRideType;
    bind?: {
        customer_id: string;
        driver_id: string;
    }
}

export abstract class RequestFactory {
    private static baseUrl: string = 'http://localhost:8080';
    private static headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    public static request({ method, bind, body, endPoints }: FetchOptions): Request {
        const validBody = !body && method === 'GET' ? undefined : this.validateBody(body);
        const url = this.urlMaker(endPoints, bind);
        return new Request(url, {
            method: Method[method],
            headers: this.headers,
            body: method !== 'GET' ? JSON.stringify(validBody) : undefined,
        });
    }

    private static urlMaker(endPoints: keyof typeof EndPoints, bind?: { customer_id: string, driver_id: string }) {
        let url = this.baseUrl;
        if (bind) {
            url += `${EndPoints[endPoints]}/${bind.customer_id}${bind.driver_id ? `?driver_id=${bind.driver_id}` : ''}`;
        } else {
            url += EndPoints[endPoints];
        }
        return url;
    }

    private static validateBody(body: EstimateRequestType | ConfirmRideType | undefined) {
        if (!body) throw new Error('Body is required');
        const data = ValidateFields.selectInstance(body).validate();
        if (data instanceof Array) {
            throw new Error(data.join(', '));
        }
        return data;
    }

    public static getRideEstimate(body: EstimateRequestType) {
        return this.request({ method: 'POST', endPoints: 'RIDE_ESTIMATE', body });
    }
    public static confirmRide(body: ConfirmRideType) {
        return this.request({ method: 'PATCH', endPoints: 'RIDE_CONFIRM', body });
    }

    public static findHistory(customer_id: string) {
        return this.request({ method: 'GET', endPoints: 'RIDE', bind: { customer_id, driver_id: '' } });
    }
}


export class Utils {
    public static getDuration(duration: string) {
        const base = Number(duration.split('s')[0])
        const hour = Math.trunc(base / 3600)
        const min = Math.trunc(base / 60)
        const sec = (base % 60)
        return `${hour < 10 ? `0${hour}` : hour}:${min}:${sec < 10 ? `0${sec}` : sec}`
    }
}