import express, { Request, RequestHandler, Response } from 'express';
import { Route } from './types';
import MiddlewareFactory from './layers/middleware/Middleware';

export default class Application {
    #app: express.Express;

    constructor(routes: Route, app = express()) {
        this.#app = app;
        this.#config();
        this.#setRoutes(routes);
    }

    #setRoutes(routes: Route): void {
        routes.forEach(route => {
            this.#app.use(route);
        });
        this.#app.use(MiddlewareFactory.errorHandler);
    }

    #config(): void {
        const accessControl: express.RequestHandler = (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            next();
        }
        this.#app.use(express.json());
        this.#app.use(accessControl);
    }

    start(port: number): void {
        this.#app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    }
}