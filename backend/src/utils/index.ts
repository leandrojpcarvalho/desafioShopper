import { readFileSync } from "fs";
import { join } from "path";

export default class Utils {
    public static readSqlFile(path: string[], splited: true): string[];
    public static readSqlFile(path: string[], splited: false): string;
    public static readSqlFile(path: string[], splited?: boolean): string[]
    public static readSqlFile(path: string[], splited: boolean = true): string[] | string {
        if (splited) {
            return readFileSync(join(__dirname, ...path), "utf-8").split(";");
        }
        return readFileSync(join(__dirname, ...path), "utf-8");
    }
}