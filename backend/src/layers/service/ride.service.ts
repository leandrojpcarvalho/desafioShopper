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
    getRidesByCustomerAndDriver(customer_id: number, driver_id: number): ServiceResponse<HistoryRide>;
    getRidesByCustomer(customer_id: number): ServiceResponse<HistoryRide>;
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

    public async findById(id: number) {
        const response = await this.modelRide.findById(id);
        if (!response) throw new CustomError('INVALID_DATA', 'Ride not found');
        return { status: 200, data: response };
    }

    public async getRidesByCustomerAndDriver(customer_id: number, driver_id: number) {

        await this.serviceCustomer.findById(customer_id);
        await this.serviceDriver.findById(driver_id);
        const response = await this.modelRide.findRidesByCustomerAndDriver(customer_id, driver_id);
        if (response.length === 0) throw new CustomError('NO_RIDES_FOUND', 'Ride not found');
        return { status: 200, data: this.toHistoryRide(response) };
    }

    public async getRidesByCustomer(customer_id: number) {
        const data = await this.modelRide.getAllRidesById(customer_id);
        if (data.length === 0) throw new CustomError('NO_RIDES_FOUND', 'Ride not found');
        return { status: 200, data: this.toHistoryRide(data) };
    }

    public async create(confirmData: RideConfirmRequest) {
        const { customer_id, driver, ...rest } = confirmData;
        EstimateResponseFactory.confirmEstimateResponse(parseInt(confirmData.customer_id, 10), confirmData);
        const data = await this.modelRide.create({
            driver_id: driver.id,
            customer_id: parseInt(customer_id, 10),
            ...rest
        });
        return { status: 200, data: { success: true } };
    }

    public async estimate(body: IEstimateRequest) {
        await this.serviceCustomer.findById(body.customer_id);
        if (body.origin === body.destination) throw new CustomError('INVALID_DATA', 'Origin and destination must be different');
        const estimateInstance = await EstimateResponseFactory.createEstimateResponse(body)
        const { data: drivers } = await this.serviceDriver.getAllDriversByMinOrder(estimateInstance.distance);

        const reviews = (await Promise.all(drivers.map((driver) => this.modelReview.findReviewByDriverId(driver.id)))).map((review) => review[0]);

        estimateInstance.addOptions(drivers, reviews);

        return { status: StatusCodeBackend.SUCCESS, data: estimateInstance.toJSON() };
    }

    private getRidesByToRide({ name, driver_id, customer_id, value, distance, ...rest }: GetRidesBy): Remove<Ride, 'customer_id'> {
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