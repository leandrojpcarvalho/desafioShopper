import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import allSchemas from "./schema";
import CustomError from "../../entities/CustomError";

export default class MiddlewareFactory {
    #schemas: { [key: string]: Joi.ObjectSchema };

    constructor(schemas = allSchemas) {
        this.#schemas = schemas;
    }

    validade(schema: keyof typeof allSchemas) {
        return (req: Request, res: Response, next: NextFunction) => {
            const { error } = this.#schemas[schema].validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.message });
            }
            next();
        }
    }
    public static errorHandler(error: CustomError, req: Request, res: Response, next: NextFunction) {
        const status = error.status || 500;
        const error_code = error.error_code || 'internal_server_error';
        const error_description = error.error_description || 'Something went wrong';

        res.status(status).json({ error_code, error_description });
    }

}