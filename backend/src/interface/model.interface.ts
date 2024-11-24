import { IDatabase } from "./database.interface";

export default interface IModel<T> {
    findAll(table: keyof IDatabase): Promise<T[]>;
    findById(id: number, table: keyof IDatabase): Promise<T | null>;
    create(data: T, table: keyof IDatabase): Promise<T>;
    update(id: number, data: T, table: keyof IDatabase): Promise<T | null>;
    delete(id: number, table: keyof IDatabase): Promise<boolean>;
    customQuery<R>(query: string): Promise<R[]>;
}