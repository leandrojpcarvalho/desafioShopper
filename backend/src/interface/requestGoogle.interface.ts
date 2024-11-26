export default interface IRequestGoogle {
    origin: IWaypoint;
    destination: IWaypoint;
    travelMode: 'DRIVE';
    units: 'METRIC';
}

export interface IWaypoint {
    via: boolean;
    vehicleStopover: boolean;
    sideOfRoad: boolean;
    address: string;
}

export interface IResponseGoogle {
    data: {
        routes: IRoute[];
    } | string;
}

export interface IRoute {
    distanceMeters: number;
    duration: string;
    polyline: {
        encodedPolyline: string;
    }
}