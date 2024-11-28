import { Creation, CustomQueryOptions } from "../utils/types";
import { IDatabase } from "./database.interface";



export default interface IModel<T> {
    findAll(table: keyof IDatabase): Promise<T[]>;
    findById(id: string, table: keyof IDatabase): Promise<T | null>;
    create(data: Creation<T>, table: keyof IDatabase): Promise<boolean>;
    update(id: number, data: Partial<T>, table: keyof IDatabase): Promise<T | null>;
    delete(id: number, table: keyof IDatabase): Promise<boolean>;
    customQuery<R>(path: string[], options?: CustomQueryOptions): Promise<R[]>;
}