import ICustomError from "../interface/error.interface";
import { MapMessage, StatusCodeBackend } from "../utils/EnumError";

export default class CustomError extends Error implements ICustomError {
    public status: number;
    public error_code: string;
    public error_description: string;

    constructor(error_code: keyof typeof StatusCodeBackend, message: string) {
        super(message);
        this.status = StatusCodeBackend[error_code];
        this.error_code = error_code;
        this.error_description = MapMessage[error_code];
    }
}