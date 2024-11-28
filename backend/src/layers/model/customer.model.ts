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

    public async findById(id: string): Promise<ICustomerDB | null> {
        const customer = await this.model.findById(id, 'customers');
        return customer;
    }

    public async findByCustomQuery(options: CustomQueryOptions): Promise<ICustomerDB[]> {
        const customers = await this.model.customQuery<ICustomerDB>([''], options);
        return customers;
    }
}