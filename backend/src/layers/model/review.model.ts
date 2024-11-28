import ModelSql from "../../db/model";
import { IDatabase, IReviewDB } from "../../interface/database.interface";
import IModel from "../../interface/model.interface";
import IModelBack from "../../interface/modelBack.interteface";
import { CustomQueryOptions } from "../../utils/types";

export interface IReviewModel extends IModelBack<IReviewDB> {
    findReviewByDriverId(driverId: number): Promise<IReviewDB[]>;
}


export default class ReviewModel implements IReviewModel {
    private model: IModel<IReviewDB>;

    constructor(model: IModel<IReviewDB> = new ModelSql<IReviewDB>()) {
        this.model = model;
    }
    public findByCustomQuery(options: CustomQueryOptions): Promise<IReviewDB[]> {
        return this.model.customQuery([''], options);
    }

    public async findById(id: string) {
        const review = await this.model.findById(id, 'reviews');
        return review;
    }

    public async findReviewByDriverId(id: number) {
        const review = await this.model.customQuery<IReviewDB>(['get-best-review.sql'], { bindParams: [id] });
        return review;
    }

}
