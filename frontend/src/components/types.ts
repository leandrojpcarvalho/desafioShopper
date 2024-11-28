export type ElementsFactory<T> = { [K in keyof T]: JSX.Element }
export type Remove<T, R extends keyof T> = Omit<T, R>;
export type Select<T, R extends keyof T> = Pick<T, R>;



export type EstimateResponse = {
    customer_id: string;
    destination: LatLocation;
    origin: LatLocation;
    distance: number;
    duration: string;
    options: Driver[];
    routeResponse: GoogleResponse;
}


export type GoogleResponse = {
    routes: RoutesGoogle[];
}

export type RoutesGoogle = {
    duration: string;
    distanceMeters: string;
    polyline: {
        encodedPolyline: string;
    };
    legs: Legs;
}


export type Legs = [{
    startLocation: { latLng: LatLocation },
    endLocation: { latLng: LatLocation }
}]


export type LatLocation = {
    latitude: number;
    longitude: number;
}

export type Driver = {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    value: number;
    review: {
        comment: string;
        rating: number;
    }
}

export type EstimateRequestType = {
    customer_id: string;
    origin: string;
    destination: string;
}


export type ConfirmRideType = {
    driver: Select<Driver, 'id' | 'name'>;
    customer_id: string;
    destination: string;
    origin: string;
    distance: number;
    duration: string;
    value: number;
}

export interface IMethods<T> {
    validate(): T | string[];
}

export type Ride = Remove<ConfirmRideType, "value" | "distance" | "driver" | 'customer_id'> & {
    date: Date;
    driver: Select<Driver, "id" | "name">;
    id: number;
    value: number;
    distance: number;
}

export type HistoryRide = {
    customer_id: string;
    rides: Ride[]
}

export interface Poi {
    key: string,
    location: google.maps.LatLngLiteral
    background: string;
}
