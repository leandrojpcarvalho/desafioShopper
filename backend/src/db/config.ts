import { createPool, Pool } from "mysql2/promise";
import Utils from "../utils";

export default class DatabaseManager {
    private static mySqlConnection: Pool = createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'mobee',
        port: parseInt(process.env.DB_PORT || '3306'),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    public static getConnection() {
        return this.mySqlConnection
    }

    public static async createDatabase(): Promise<void> {
        const connection = await this.mySqlConnection.getConnection();
        await this.#runQueries(['create-database.sql']);
        const data = (await connection.query('select * from customers'))[0] as [];
        if (data.length === 0) {
            await this.#insertData();
        }
    }

    public static async dropTables(): Promise<void> {
        const tables = await this.#runQueries(['get-db-schema.sql']);
        if (tables[0][0].length > 0) {
            await this.#runQueries(['drop-tables.sql']);
        }
    }

    static async #insertData(): Promise<void> {
        this.#runQueries(['seeds.sql']);
    }

    static async #runQueries(path: string[]): Promise<any[]> {
        const queries = await Utils.readSqlFile(path, true);
        const connection = await this.mySqlConnection.getConnection();
        let result = [];
        for (const query of queries) {
            if (query.trim() !== '') {
                result.push(await connection.query(query + ";"));
            }
        }
        return result;
    }

}
