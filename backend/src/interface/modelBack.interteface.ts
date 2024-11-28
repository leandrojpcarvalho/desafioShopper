import { CustomQueryOptions } from "../utils/types";

export default interface IModelBack<T> {
    findById(id: string): Promise<T | null>;
    findByCustomQuery(options: CustomQueryOptions): Promise<T[]>;
}