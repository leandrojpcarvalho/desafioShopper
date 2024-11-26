import { NextFunction, Request, RequestHandler, Response } from "express";
import RideService from "../service/ride.service";


export interface RideControllerPrivateMethods {
    estimate(req: Request, res: Response): void;
    confirm(req: Request, res: Response): void;
    getRideByCustomerAndDriver(req: Request, res: Response): void;
}

export default class RideController {
    private rideService: RideService;

    constructor(rideService = new RideService()) {
        this.rideService = rideService;
    }

    private async estimate(req: Request, res: Response) {
        const { status, data } = await this.rideService.estimate(req.body);
        res.status(status).send(data);
    }

    private async confirm(req: Request, res: Response) {
        const { status, data } = await this.rideService.create(req.body);
        res.status(status).send(data);
    }

    private async getRideByCustomerAndDriver(req: Request, res: Response) {
        const { customer_id } = req.params;
        const { driver_id } = req.query;
        if (!customer_id) {
            res.status(400).send({ message: 'Customer id is required' });
            return;
        }
        if (!driver_id) {
            const { status, data } = await this.rideService.getRidesByCustomer(parseInt(customer_id));
            res.status(status).send(data);
            return;
        }
        const { status, data } = await this.rideService.getRidesByCustomerAndDriver(parseInt(customer_id), parseInt(driver_id.toString()));
        res.status(status).send(data);
    }

    private asyncHandler(fn: (req: Request, res: Response) => Promise<void>) {
        return (req: Request, res: Response, next: NextFunction) => {
            return fn(req, res).catch(next);
        }
    }

    public getMethod(method: keyof RideControllerPrivateMethods): RequestHandler {
        return this.asyncHandler(this[method].bind(this));
    }
}