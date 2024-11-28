import CustomError from "../../entities/CustomError";
import EstimateResponseFactory from "../../entities/EstimateFactory";
import { IRideDB } from "../../interface/database.interface";
import IEstimateRequest, { IEstimateResponse } from "../../interface/estimate.interface";
import IService from "../../interface/service.interface";
import { StatusCodeBackend } from "../../utils/EnumError";
import ReviewModel, { IReviewModel } from "../model/review.model";
import RideModel from "../model/ride.model";
import CustomerService from "./customer.service";
import DriverService, { IDriverService } from "./driver.service";
import { GetRidesBy, HistoryRide, Remove, Ride, RideConfirmRequest, ServiceResponse } from "../../utils/types";

interface IRideService extends IService<IRideDB> {
    estimate(body: IEstimateRequest): ServiceResponse<IEstimateResponse>;
    create(data: RideConfirmRequest): ServiceResponse<{ success: boolean }>;
    getRidesByCustomerAndDriver(customer_id: string, driver_id: number): ServiceResponse<HistoryRide>;
    getRidesByCustomer(customer_id: string): ServiceResponse<HistoryRide>;
}


export default class RideService implements IRideService {
    private modelRide: RideModel;
    private serviceCustomer: CustomerService;
    private serviceDriver: IDriverService;
    private modelReview: IReviewModel;

    constructor(model = new RideModel(), serviceCustomer = new CustomerService(), serviceDriver = new DriverService(), modelReview = new ReviewModel()) {
        this.modelRide = model;
        this.serviceCustomer = serviceCustomer;
        this.serviceDriver = serviceDriver;
        this.modelReview = modelReview;
    }

    public async findById(id: string) {
        const response = await this.modelRide.findById(id);
        if (!response) throw new CustomError('INVALID_DATA', 'Ride not found');
        return { status: 200, data: response };
    }

    public async getRidesByCustomerAndDriver(customer_id: string, driver_id: number) {

        await this.serviceCustomer.findById(customer_id);
        await this.serviceDriver.findById(driver_id.toString());
        const response = await this.modelRide.findRidesByCustomerAndDriver(customer_id, driver_id);
        if (response.length === 0) throw new CustomError('NO_RIDES_FOUND', 'Ride not found');
        return { status: 200, data: this.toHistoryRide(response) };
    }

    public async getRidesByCustomer(customer_id: string) {
        const data = await this.modelRide.getAllRidesById(parseInt(customer_id));
        if (data.length === 0) throw new CustomError('NO_RIDES_FOUND', 'Ride not found');
        return { status: 200, data: this.toHistoryRide(data) };
    }

    public async create(confirmData: RideConfirmRequest) {
        const { customer_id, driver, ...rest } = confirmData;
        const isValid = EstimateResponseFactory.confirmEstimateResponse(confirmData.customer_id, confirmData);
        if (!isValid) throw new CustomError('INVALID_DATA', 'Estimate not found');
        const data = await this.modelRide.create({
            driver_id: driver.id,
            customer_id,
            ...rest
        });
        return { status: 200, data: { success: true } };
    }

    public async estimate(body: IEstimateRequest) {
        await this.serviceCustomer.findById(body.customer_id);
        if (body.origin === body.destination) throw new CustomError('INVALID_DATA', 'Origin and destination must be different');
        console.log(body);
        const estimateInstance = await EstimateResponseFactory.createEstimateResponse(body)
        const { data: drivers } = await this.serviceDriver.getAllDriversByMinOrder(estimateInstance.distance);
        if (drivers.length === 0) {
            throw new CustomError('NO_DRIVERS_FOUND', 'No drivers found');
        }

        const reviews = (await Promise.all(drivers.map((driver) => this.modelReview.findReviewByDriverId(driver.id)))).map((review) => review[0]);

        estimateInstance.addOptions(drivers, reviews);

        return { status: StatusCodeBackend.SUCCESS, data: estimateInstance.toJSON() };
    }

    private getRidesByToRide({ name, driver_id, customer_id, description, value, distance, ...rest }: GetRidesBy): Remove<Ride, 'customer_id'> {
        return {
            ...rest,
            driver: {
                id: driver_id,
                name
            },
            distance: Number(distance),
            value: Number(value),
        }
    }

    private toHistoryRide(data: GetRidesBy[]): HistoryRide {
        const rides = data.map(this.getRidesByToRide);
        return {
            customer_id: data[0].customer_id,
            rides
        }
    }
}