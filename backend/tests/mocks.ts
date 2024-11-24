import { QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";

export const mockModelSql = [[{ id: 1 }, { id: 2 }]] as RowDataPacket[][];
export const mockById = [{ id: 1 }] as RowDataPacket[];
export const mockByIdNotFound = [] as RowDataPacket[];
export const affectedRows = { affectedRows: 1 } as ResultSetHeader;