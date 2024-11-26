import IRequestGoogle, { IWaypoint } from "../interface/requestGoogle.interface";

class Origin implements IWaypoint {
    via: boolean;
    vehicleStopover: boolean;
    sideOfRoad: boolean;
    address: string;
    constructor(address: string) {
        this.via = false;
        this.vehicleStopover = true;
        this.sideOfRoad = true;
        this.address = address
    }
}

class Destination implements IWaypoint {
    via: boolean;
    vehicleStopover: boolean;
    sideOfRoad: boolean;
    address: string;
    constructor(address: string) {
        this.via = false;
        this.vehicleStopover = true;
        this.sideOfRoad = true;
        this.address = address
    }
}

export default class ComputerRoutesBodyFactory implements IRequestGoogle {
    origin: Origin;
    destination: Destination;
    travelMode: 'DRIVE';
    units: 'METRIC';
    private constructor(origin: Origin, destination: Destination) {
        this.origin = origin
        this.destination = destination;
        this.travelMode = 'DRIVE';
        this.units = 'METRIC';
    }

    public static create(addressOrigin: string, addressDestination: string) {
        return new ComputerRoutesBodyFactory(new Origin(addressOrigin), new Destination(addressDestination));
    }
}