import { StatusCodes } from "http-status-codes";
import ICustomError from "../interface/error.interface";

export default class CustomError extends Error implements ICustomError {
    public status: number;
    public error_code: string;
    public error_description: string;

    constructor(error_code: keyof typeof StatusCodes, error_description: string) {
        super(error_description);
        this.status = StatusCodes[error_code];
        this.error_code = error_code;
        this.error_description = error_description;
    }
}