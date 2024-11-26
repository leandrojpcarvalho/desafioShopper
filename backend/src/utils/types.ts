import express from 'express';
import IEstimateRequest, { IEstimateResponse, LatLocation } from '../interface/estimate.interface';
import { StatusCodeBackend } from './EnumError';
import { IDriverCalculate, IDriverDB, IReviewDB, IRideDB } from '../interface/database.interface';


export type Remove<T, R extends keyof T> = Omit<T, R>;
export type Select<T, R extends keyof T> = Pick<T, R>;

export type Creation<T> = Omit<T, 'id' | 'created_at' | 'date' | 'updated_at'>;

export type Response<T> = {
    status: number;
    data: T;
}

export type ServiceResponse<T> = Promise<Response<T>>

export type Routes = express.Router[];

export type EstimateRequest = Remove<IEstimateRequest, 'customer_id'> & { customer_id: string };



export type ErrorResponse = {
    error_code: keyof typeof StatusCodeBackend;
    error_description?: string;
}

export type ErrorResponseGoogleAPI = {
    error: {
        code: number;
        message: string;
        status: string;
        details: [{
            "@type": string;
            fieldViolations: [{
                description: string;
                field: string;
            }]
        }]
    }
}

export type CustomQueryOptions = {
    bindParams?: any[];
    query?: string;
};

export type Legs = [{
    startLocation: { latLng: LatLocation },
    endLocation: { latLng: LatLocation }
}]


export type RoutesGoogle = {
    duration: string;
    distanceMeters: string;
    polyline: {
        encodedPolyline: string;
    };
    legs: Legs;
}

export type GoogleResponse = {
    routes: RoutesGoogle[];
}

export type GoogleServiceResponse = GoogleResponse | ErrorResponseGoogleAPI;

export type DriverBestReview = Remove<IReviewDB, 'driver_id' | 'customer_id' | 'id' | 'ride_id'>;

export type DriverCalculated = Remove<IDriverCalculate, 'tax' | 'min_order' | 'reviews'> & { review: DriverBestReview };


export type RideConfirmRequest = Remove<IEstimateResponse, 'destination' | 'origin' | 'options' | 'customer_id' | 'routeResponse'> & { driver: IDriverDB, destination: string, origin: string, customer_id: string, value: number };

export type DriveClean = Remove<IDriverDB, 'id' | 'min_order' | 'tax'>;

export type GetRidesBy = Remove<IRideDB & DriveClean, 'vehicle' | 'customer_id'> & { customer_id: string };

export type Ride = Remove<RideConfirmRequest, 'driver' | 'value' | 'distance'> & { date: Date, driver: Select<IDriverDB, 'id' | 'name'>, id: number, value: number, distance: number };

export type HistoryRide = {
    customer_id: string;
    rides: Remove<Ride, 'customer_id'>[]
}