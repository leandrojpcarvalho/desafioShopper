import { CustomQueryOptions } from "../utils/types";

export default interface IModelBack<T> {
    update(id: number, data: Partial<T>): Promise<T | null>;
    findById(id: number): Promise<T | null>;
    findByCustomQuery(options: CustomQueryOptions): Promise<T[]>;
}