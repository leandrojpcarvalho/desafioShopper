import ModelSql from "../../db/model";
import CustomError from "../../entities/CustomError";
import { IDriverDB } from "../../interface/database.interface";
import IModel from "../../interface/model.interface";
import IModelBack from "../../interface/modelBack.interteface";
import { CustomQueryOptions } from "../../utils/types";


export default class DriverModel implements IModelBack<IDriverDB> {
    private model: IModel<IDriverDB>;

    constructor(model: IModel<IDriverDB> = new ModelSql<IDriverDB>()) {
        this.model = model;
    }

    public async findById(id: string): Promise<IDriverDB | null> {
        const driver = await this.model.findById(id, 'drivers');
        return driver;
    }
    public async findByCustomQuery(options: CustomQueryOptions): Promise<IDriverDB[]> {
        const drivers = await this.model.customQuery<IDriverDB>([''], options);
        return drivers;
    }
}