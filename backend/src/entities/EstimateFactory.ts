import instanceServiceGoogle, { GoogleService } from "../APIGoogle/service/index.service";
import { IDriverDB, IReviewDB } from "../interface/database.interface";
import IEstimateRequest, { IEstimateResponse, LatLocation } from "../interface/estimate.interface";
import { DriverCalculated, GoogleResponse, RideConfirmRequest } from "../utils/types";
import CustomError from "./CustomError";


export default class EstimateResponseFactory {
    private static instancesEstimateResponse: Map<number, EstimateResponseClass> = new Map();
    private static serviceGoogle = instanceServiceGoogle;

    public static async createEstimateResponse(body: IEstimateRequest): Promise<EstimateResponseClass> {
        const response = await this.serviceGoogle.getRoutes(body.origin, body.destination);
        if (this.serviceGoogle.isErrorResponse(response)) {
            throw new CustomError('GOOGLE_API_ERROR', response.error.details.join('; '));
        }
        const instance = new EstimateResponseClass(body.customer_id, response, body);
        this.instancesEstimateResponse.set(body.customer_id, instance);
        return instance;
    }
    public static confirmEstimateResponse(customer_id: number, confirmationRequest: RideConfirmRequest): boolean {
        const instance = this.instancesEstimateResponse.get(customer_id);
        if (!instance) throw new CustomError('INVALID_DATA', 'Estimate not found');
        if (instance.isValid(confirmationRequest)) {
            this.instancesEstimateResponse.delete(customer_id);
            return true;
        }
        return false;
    }
}

interface EstimateResponseMethods {
    addOptions(drivers: IDriverDB[], reviews: IReviewDB[]): void;
    toJSON(): IEstimateResponse;
}

export class EstimateResponseClass implements EstimateResponseClass, EstimateResponseMethods {
    customer_id: number;
    initialRequest: IEstimateRequest;
    destination: LatLocation;
    origin: LatLocation;
    distance: number;
    duration: string;
    options: DriverCalculated[];
    mappedBestReviews: Map<number, IReviewDB> = new Map();
    routeResponse: GoogleResponse;
    constructor(id: number, responseGoogle: GoogleResponse, initialRequest: IEstimateRequest) {
        this.customer_id = id;
        this.routeResponse = responseGoogle;
        this.destination = responseGoogle.routes[0].legs[0].endLocation.latLng;
        this.origin = responseGoogle.routes[0].legs[0].startLocation.latLng;
        this.distance = parseInt(responseGoogle.routes[0].distanceMeters, 10);
        this.duration = responseGoogle.routes[0].duration;
        this.initialRequest = initialRequest;
        this.options = [];
    }

    public addOptions(drivers: IDriverDB[], reviews: IReviewDB[]) {
        this.options = drivers.map(driver => this.adaptDriverToCalculetedDriver(driver, reviews));

    }

    public toJSON(): IEstimateResponse {
        return {
            customer_id: this.customer_id,
            destination: this.destination,
            origin: this.origin,
            distance: this.distance,
            duration: this.duration,
            options: this.options,
            routeResponse: this.routeResponse
        }
    }

    private adaptDriverToCalculetedDriver({ min_order, tax, id, ...rest }: IDriverDB, reviews: IReviewDB[]): DriverCalculated {
        this.mapReviews(reviews);
        return {
            ...rest,
            id,
            review: this.mappedBestReviews.get(id) ?? { rating: 0, comment: '' },
            value: (this.distance / 1000) * tax,
        }
    }

    private mapReviews(reviews: IReviewDB[]) {
        reviews.forEach(review => {
            const bestReview = this.mappedBestReviews.get(review.driver_id);
            if (!bestReview) {
                this.mappedBestReviews.set(review.driver_id, review);
            } else if (bestReview.rating < review.rating) {
                this.mappedBestReviews.set(review.driver_id, review);
            }
        });
    }

    public isValid(rideConfirmation: RideConfirmRequest): boolean {
        const driver = this.options.find(driver => driver.id === rideConfirmation.driver.id && driver.name === rideConfirmation.driver.name);
        console.log(driver);
        if (!driver) throw new CustomError('DRIVER_NOT_FOUND', 'Driver not found');
        if (driver.value !== rideConfirmation.value) throw new CustomError('INVALID_DATA', 'Invalid value');
        if (this.initialRequest.destination !== rideConfirmation.destination) throw new CustomError('INVALID_DATA', 'Invalid destination');;
        if (this.initialRequest.origin !== rideConfirmation.origin) throw new CustomError('INVALID_DATA', 'Invalid origin');;
        if (this.distance !== rideConfirmation.distance) throw new CustomError('INVALID_DISTANCE', 'Invalid distance');
        if (this.duration !== rideConfirmation.duration) throw new CustomError('INVALID_DATA', 'Invalid duration');;
        return true;
    }
}