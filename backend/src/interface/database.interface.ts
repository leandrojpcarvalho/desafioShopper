import IDriver from "./divers.interface";
import IRide from "./ride.interface";
import ICustomer from "./users.interface";

export interface IDatabase {
    drivers: IDriver[];
    customers: ICustomer[];
    rides: IRide[];
}