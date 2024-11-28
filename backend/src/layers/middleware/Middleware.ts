import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import allSchemas from "./schema";
import CustomError from "../../entities/CustomError";

export default class MiddlewareFactory {
    static #schemas: { [key: string]: Joi.ObjectSchema } = allSchemas;


    static validade(schema: keyof typeof allSchemas) {
        return (req: Request, res: Response, next: NextFunction) => {
            const { error } = this.#schemas[schema].validate(req.body);
            if (error) {
                res.status(400).json({ error: error.message });
            }
            next();
        }
    }

    public static errorHandler(error: CustomError, req: Request, res: Response, next: NextFunction) {
        if (res.headersSent) {
            return next(error);
        }
        const status = error.status || 500;
        const error_code = error.error_code || 'internal_server_error';
        const error_description = error.error_description || 'Something went wrong: ' + error.message;

        res.status(status).json({ error_code, error_description });
    }

}