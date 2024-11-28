import ModelSql from "../../db/model";
import CustomError from "../../entities/CustomError";
import { IRideDB } from "../../interface/database.interface";
import IModel from "../../interface/model.interface";
import IModelBack from "../../interface/modelBack.interteface";
import { Creation, CustomQueryOptions, GetRidesBy } from "../../utils/types";


export default class RideModel {
    private model: IModel<IRideDB>;

    constructor(model: IModel<IRideDB> = new ModelSql<IRideDB>()) {
        this.model = model;
    }

    public async findRidesByCustomerAndDriver(customer_id: string, driver_id: number): Promise<GetRidesBy[]> {
        const options: CustomQueryOptions = { bindParams: [driver_id.toString(), customer_id.toString()] };
        const ride = await this.model.customQuery<GetRidesBy>(['get-rides-by-driver-and-customer.sql'], options);
        return ride;
    }

    public async create(data: Creation<IRideDB>) {
        return await this.model.create(data, 'rides');
    }

    public async getAllRidesById(id: number) {
        const options: CustomQueryOptions = { bindParams: [id.toString()] };
        return await this.model.customQuery<GetRidesBy>(['get-rides-by-id.sql'], options);
    }

    public async findById(id: string): Promise<IRideDB | null> {
        const ride = await this.model.findById(id, 'rides');
        return ride;
    }
}