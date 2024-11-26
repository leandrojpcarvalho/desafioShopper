import axios, { AxiosInstance } from "axios";
import ComputerRoutesBodyFactory from "../../entities/ComputerRoutesBodyFactory";
import { IResponseGoogle, IRoute } from "../../interface/requestGoogle.interface";
import { ErrorResponseGoogleAPI, GoogleServiceResponse, ServiceResponse } from "../../utils/types";
import CustomError from "../../entities/CustomError";

export type GoogleServiceProps = {
    connection: AxiosInstance;
}

// { routes: IRoute[] } | string

export class GoogleService {
    private static instance: GoogleService;
    private connection: AxiosInstance;


    private constructor(connection: AxiosInstance) {
        this.connection = connection;
    }

    public async getRoutes(addressOrigin: string, addressDestination: string): Promise<GoogleServiceResponse> {
        const body = ComputerRoutesBodyFactory.create(addressOrigin, addressDestination);
        const { data } = await this.connection.post('v2:computeRoutes', {
            origin: body.origin,
            destination: body.destination,
            travelMode: body.travelMode,
            units: body.units
        });
        return data;
    }

    public static getInstance({ connection }: GoogleServiceProps) {
        if (!GoogleService.instance) {
            GoogleService.instance = new GoogleService(connection);
        }
        return GoogleService.instance;
    }

    public isErrorResponse(response: GoogleServiceResponse): response is ErrorResponseGoogleAPI {
        return (response as ErrorResponseGoogleAPI).error !== undefined;
    }
}

export default GoogleService.getInstance({
    connection: axios.create({
        baseURL: 'https://routes.googleapis.com/directions',
        method: 'POST',
        headers: {
            'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs.startLocation,routes.legs.endLocation',
            'X-Goog-Api-Key': process.env.GOOGLE_API_KEY || '',
            'Content-Type': 'application/json'
        },
        validateStatus: () => true
    }),
});
