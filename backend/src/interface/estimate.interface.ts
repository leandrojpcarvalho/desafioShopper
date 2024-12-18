import { DriverCalculated, GoogleResponse } from "../utils/types";

export default interface IEstimateRequest {
    customer_id: string;
    origin: string;
    destination: string;
}


export interface IEstimateResponse {
    customer_id: string;
    destination: LatLocation;
    origin: LatLocation;
    distance: number;
    duration: string;
    options: DriverCalculated[];
    routeResponse: GoogleResponse;
}

export interface LatLocation {
    latitude: number;
    longitude: number;
}