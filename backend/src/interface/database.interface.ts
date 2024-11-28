export interface IDatabase {
    drivers: IDriverDB[];
    customers: ICustomerDB[];
    rides: IRideDB[];
    reviews: IReviewDB[];
}

export interface IDriverDB {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    tax: number;
    min_order: number;
}

export interface IDriverCalculate extends IDriverDB {
    reviews: IReviewDB[];
    value: number;
}

export interface IRideDB {
    id: number;
    customer_id: string;
    driver_id: number;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    date: Date;
}

export interface ICustomerDB {
    id: string;
}

export interface IReviewDB {
    id: number;
    ride_id: number;
    driver_id: number;
    customer_id: string;
    comment: string;
    rating: number;
}