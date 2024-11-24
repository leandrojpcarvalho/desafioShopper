import { readFile } from "fs/promises";
import { join } from "path";
import CustomError from "../entities/CustomError";
import { StatusCodes } from "http-status-codes";

export default class Utils {
    public static async readSqlFile(path: string[], splited: true): Promise<string[]>;
    public static async readSqlFile(path: string[], splited: false): Promise<string>;
    public static async readSqlFile(path: string[], splited?: boolean): Promise<string[] | string>;
    public static async readSqlFile(path: string[], splited: boolean = true): Promise<string[] | string> {
        try {
            const data = await readFile(join(__dirname, ...path), 'utf-8')
            return splited ? data.split(';') : data;
        } catch (error: any) {
            throw new CustomError('INTERNAL_SERVER_ERROR', error.message);
        }
    }
}