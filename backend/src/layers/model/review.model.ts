import ModelSql from "../../db/model";
import { IDatabase, IReviewDB } from "../../interface/database.interface";
import IModel from "../../interface/model.interface";
import IModelBack from "../../interface/modelBack.interteface";
import { CustomQueryOptions } from "../../utils/types";

export interface IReviewModel extends IModel<IReviewDB> {
    findReviewByDriverId(driverId: number): Promise<IReviewDB[]>;
}


export default class ReviewModel implements IReviewModel {
    private model: IModel<IReviewDB>;

    constructor(model: IModel<IReviewDB> = new ModelSql<IReviewDB>()) {
        this.model = model;
    }

    public async customQuery<R>(path: string[], options?: CustomQueryOptions): Promise<R[]> {
        const reviews = this.model.customQuery<R>(path, options);
        return reviews;
    }

    public async findAll(table: keyof IDatabase): Promise<IReviewDB[]> {
        return this.model.findAll('reviews');
    }

    public async create(data: IReviewDB) {
        return this.model.create(data, 'reviews');
    }

    public async delete(id: number): Promise<boolean> {
        return this.model.delete(id, 'reviews');
    }

    public async update(id: number, data: Partial<IReviewDB>) {
        const updatedData = this.model.update(id, data, 'reviews');
        return updatedData;
    }

    public async findById(id: number) {
        const review = await this.model.findById(id, 'reviews');
        return review;
    }

    public async findReviewByDriverId(id: number) {
        const review = await this.model.customQuery<IReviewDB>(['get-best-review.sql'], { bindParams: [id] });
        return review;
    }

}
