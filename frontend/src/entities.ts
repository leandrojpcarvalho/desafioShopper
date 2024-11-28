import { ConfirmRideType, Driver, EstimateRequestType, IMethods, Select } from "./components/types";

export default abstract class ValidateFields {
    private static instances = new Array<EstimateRequest | ConfirmRide>();

    private static getInstanceEstimateRequest(obj: EstimateRequestType): EstimateRequest {
        const exist = this.instances.find(instance => instance instanceof EstimateRequest);
        if (exist) {
            exist.origin = obj.origin;
            exist.destination = obj.destination;
            exist.customer_id = obj.customer_id;
            return exist;
        }
        const instance = new EstimateRequest(obj);
        this.instances.push(instance);
        return instance;
    }

    private static getInstanceConfirmRide(obj: ConfirmRideType): ConfirmRide {
        const exist = this.instances.find(instance => instance instanceof ConfirmRide);
        if (exist) {
            exist.driver = { id: obj.driver.id, name: obj.driver.name };
            exist.customer_id = obj.customer_id;
            exist.destination = obj.destination;
            exist.origin = obj.origin;
            exist.distance = obj.distance;
            exist.duration = obj.duration;
            exist.value = obj.value;
            return exist;
        }
        const instance = new ConfirmRide(obj);
        this.instances.push(instance);
        return instance;
    }

    public static selectInstance(obj: EstimateRequestType | ConfirmRideType): EstimateRequest | ConfirmRide {
        if ('driver' in obj) {
            return this.getInstanceConfirmRide(obj);
        }
        return this.getInstanceEstimateRequest(obj);
    }

}


class EstimateRequest implements EstimateRequestType, IMethods<EstimateRequestType> {
    customer_id: string;
    origin: string;
    destination: string;

    constructor({ customer_id, origin, destination }: EstimateRequestType) {
        this.customer_id = customer_id;
        this.origin = origin;
        this.destination = destination;
    }

    validate() {
        const errors = []
        if (this.customer_id === undefined) {
            errors.push('customer_id')
        }
        if (this.origin === undefined) {
            errors.push('origin')
        }
        if (this.destination === undefined) {
            errors.push('destination')
        }
        if (this.origin === this.destination) {
            errors.push('origin and destination must be different')
        }
        if (errors.length === 0) {
            return {
                customer_id: this.customer_id,
                origin: this.origin,
                destination: this.destination
            }
        }
        return errors
    }
}

class ConfirmRide implements ConfirmRideType, IMethods<ConfirmRideType> {
    driver: Select<Driver, "id" | "name">;
    customer_id: string;
    destination: string;
    origin: string;
    distance: number;
    duration: string;
    value: number;

    constructor({ driver, customer_id, destination, origin, distance, duration, value }: ConfirmRideType) {
        this.driver = { id: driver.id, name: driver.name };
        this.customer_id = customer_id;
        this.destination = destination;
        this.origin = origin;
        this.distance = distance;
        this.duration = duration
        this.value = value
    }

    validate() {
        const errors = []
        if (this.driver === undefined) {
            errors.push('driver')
        }
        if (this.customer_id === undefined) {
            errors.push('customer_id')
        }
        if (this.destination === undefined) {
            errors.push('destination')
        }
        if (this.origin === undefined) {
            errors.push('origin')
        }
        if (this.distance === undefined) {
            errors.push('distance')
        }
        if (this.duration === undefined) {
            errors.push('duration')
        }
        if (this.value === undefined) {
            errors.push('value')
        }
        if (errors.length === 0) {
            return {
                driver: this.driver,
                customer_id: this.customer_id,
                destination: this.destination,
                origin: this.origin,
                distance: this.distance,
                duration: this.duration,
                value: this.value
            }
        }
        return errors

    }

}


