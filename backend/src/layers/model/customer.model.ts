import ModelSql from "../../db/model";
import { ICustomerDB } from "../../interface/database.interface";
import IModel from "../../interface/model.interface";
import IModelBack from "../../interface/modelBack.interteface";
import { CustomQueryOptions } from "../../utils/types";


export default class CustomerModel implements IModelBack<ICustomerDB> {
    private model: IModel<ICustomerDB>;

    constructor(model: IModel<ICustomerDB> = new ModelSql<ICustomerDB>()) {
        this.model = model;
    }

    public async update(id: number, data: Partial<ICustomerDB>): Promise<ICustomerDB | null> {
        const updatedData = await this.model.update(id, data, 'customers');
        return updatedData;
    }

    public async findById(id: number): Promise<ICustomerDB | null> {
        const customer = await this.model.findById(id, 'customers');
        return customer;
    }

    public async findByCustomQuery(options: CustomQueryOptions): Promise<ICustomerDB[]> {
        const customers = await this.model.customQuery<ICustomerDB>([''], options);
        return customers;
    }
}