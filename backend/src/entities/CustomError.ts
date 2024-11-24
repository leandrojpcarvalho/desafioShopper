import ICustomError from "../interface/error.interface";

export default class CustomError extends Error implements ICustomError {
    public status: number;
    public error_code: string;
    public error_description: string;

    constructor(status: number, error_code: string, error_description: string) {
        super(error_description);
        this.status = status;
        this.error_code = error_code;
        this.error_description = error_description;
    }
}