import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import IModel from "../interface/model.interface";
import mySqlConnection from "./config";
import Utils from "../utils";
import { IDatabase } from "../interface/database.interface";

export default class ModelSql<T> implements IModel<T> {
    #model: Pool;

    constructor(model: Pool = mySqlConnection) {
        this.#model = model;
    }

    public async findById(id: number, table: keyof IDatabase): Promise<T | null> {
        const [[data]]: [RowDataPacket[], FieldPacket[]] = (await this.#model.query(`SELECT * FROM ${table} WHERE id = ?`, [id]));
        return data ? data as T : null;
    }

    public async create(data: T, table: keyof IDatabase): Promise<T> {
        const [[newData]]: [RowDataPacket[], FieldPacket[]] = await this.#model.query(`INSERT INTO ${table} SET ?`, [data]);
        return newData as T;
    }

    public async update(id: number, data: T, table: keyof IDatabase): Promise<T | null> {
        if (table !== 'customers') {
            await this.#model.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id]);
            return this.findById(id, table);
        }
        return null;
    }

    public async customQuery<R>(query: string): Promise<R[]> {
        return (await this.#model.query(query))[0] as R[];
    }

    public async delete(id: number, table: keyof IDatabase): Promise<boolean> {
        const [data, []]: [ResultSetHeader, FieldPacket[]] = await this.#model.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return data.affectedRows > 0;
    }

    public async findAll(table: keyof IDatabase): Promise<T[]> {
        return (await this.#model.query(`SELECT * FROM ${table}`))[0] as T[];
    }

    public static async createDatabase(): Promise<void> {
        const connection = await mySqlConnection.getConnection();
        const creation = Utils.readSqlFile(['..', 'db', './SQL', 'create-database.sql']);
        this.#runQueries(creation);
        const data = (await connection.query('select * from customers'))[0] as [];
        if (data.length === 0) {
            await this.#insertData();
        }
    }

    public static async dropTables(): Promise<void> {
        const queries = Utils.readSqlFile(['..', 'db', './SQL', 'drop-tables.sql']);
        this.#runQueries(queries);
    }

    static async #insertData(): Promise<void> {
        const data = Utils.readSqlFile(['..', 'db', './SQL', 'seeds.sql']);
        this.#runQueries(data);
    }

    static async #runQueries(queries: string[]): Promise<void> {
        const connection = await mySqlConnection.getConnection();
        for (const query of queries) {
            if (query.trim() !== '') {
                await connection.query(query + ";");
            }
        }
    }
}