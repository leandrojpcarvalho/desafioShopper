import { StatusCodes } from "http-status-codes";
import CustomError from "../../entities/CustomError";
import IModelBack from "../../interface/modelBack.interteface";
import IService from "../../interface/service.interface";
import CustomerModel from "../model/customer.model";
import { ICustomerDB } from "../../interface/database.interface";


export default class CustomerService implements IService<ICustomerDB> {
    private model: IModelBack<ICustomerDB>;

    constructor(model: IModelBack<ICustomerDB> = new CustomerModel()) {
        this.model = model;
    }
    public async update(id: number, data: Partial<ICustomerDB>) {
        const response = await this.model.update(id, data);
        if (!response) throw new CustomError('INVALID_DATA', 'Customer not found');
        return { status: StatusCodes.OK, data: response };
    }
    public async findById(id: number): Promise<{ status: number; data: ICustomerDB }> {
        const response = await this.model.findById(id);
        if (!response) throw new CustomError('INVALID_DATA', 'Customer not found');
        return { status: StatusCodes.OK, data: response };
    }
}