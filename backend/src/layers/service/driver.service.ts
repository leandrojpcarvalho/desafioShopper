import CustomError from "../../entities/CustomError";
import { IDriverDB } from "../../interface/database.interface";
import IModelBack from "../../interface/modelBack.interteface";
import IService from "../../interface/service.interface";
import { StatusCodeBackend } from "../../utils/EnumError";
import { ServiceResponse } from "../../utils/types";
import DriverModel from "../model/driver.model";

export interface IDriverService extends IService<IDriverDB> {
    getAllDriversByMinOrder(minOrder: number): ServiceResponse<IDriverDB[]>
}

export default class DriverService implements IDriverService {
    private model: IModelBack<IDriverDB>;

    constructor(model: IModelBack<IDriverDB> = new DriverModel()) {
        this.model = model;
    }

    public async findById(id: string) {
        const response = await this.model.findById(id);
        if (!response) throw new CustomError('DRIVER_NOT_FOUND', 'Driver not found');
        return { status: StatusCodeBackend.SUCCESS, data: response };
    }
    public async getAllDriversByMinOrder(minOrder: number) {
        const response = await this.model.findByCustomQuery({ query: 'SELECT * FROM drivers as D WHERE D.min_order < ? or D.min_order = ? ORDER BY D.min_order ASC', bindParams: [minOrder, minOrder] });
        return { status: StatusCodeBackend.SUCCESS, data: response };
    }
}