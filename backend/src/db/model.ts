import { FieldPacket, OkPacketParams, Pool, QueryResult, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import IModel from "../interface/model.interface";
import Utils from "../utils";
import { IDatabase } from "../interface/database.interface";
import { CustomQueryOptions } from "../utils/types";
import DatabaseManager from "./config";
import CustomError from "../entities/CustomError";

export default class ModelSql<T extends Object> implements IModel<T> {
    #model: Pool;

    constructor(model: Pool = DatabaseManager.getConnection()) {
        this.#model = model;
    }

    public async findById(id: string, table: keyof IDatabase): Promise<T | null> {
        const [[data]]: [RowDataPacket[], FieldPacket[]] = (await this.#model.query(`SELECT * FROM ${table} WHERE id = ?`, [id]));
        return data ? data as T : null;
    }

    public async create(data: T, table: keyof IDatabase) {
        try {
            const key = Object.keys(data);
            const values = Object.values(data);
            const query = `
                INSERT INTO ${table} (${key.join(',')}) 
                VALUES(${key.map(value => "?").join(",")})
            `;
            const [{ insertId }]: [ResultSetHeader, FieldPacket[]] = await this.#model.query(query, values);
            if (!insertId) {
                throw new CustomError('CREATION_FAILED', 'model.create');
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError('INTERNAL_SERVER_ERROR', error.message);
            }
        }
        return true;
    }

    public async update(id: number, data: T, table: keyof IDatabase): Promise<T | null> {
        if (table !== 'customers') {
            await this.#model.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id]);
            return this.findById(String(id), table);
        }
        return null;
    }

    public async customQuery<R>(path: string[], options?: CustomQueryOptions): Promise<R[]> {
        const { query, params } = await this.#selectQuery(path, options);
        const [data]: [QueryResult, FieldPacket[]] = await this.#model.query(query, params);
        return data as R[];
    }

    public async delete(id: number, table: keyof IDatabase): Promise<boolean> {
        const [data, []]: [ResultSetHeader, FieldPacket[]] = await this.#model.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return data.affectedRows > 0;
    }

    public async findAll(table: keyof IDatabase): Promise<T[]> {
        return (await this.#model.query(`SELECT * FROM ${table}`))[0] as T[];
    }

    async #selectQuery(path: string[], option?: CustomQueryOptions): Promise<{ query: string, params: any[] | null }> {
        return {
            query: option ? option.query ? option.query : await Utils.readSqlFile(path, false) : await Utils.readSqlFile(path, false),
            params: option ? option.bindParams ? option.bindParams : null : null
        }
    }
}