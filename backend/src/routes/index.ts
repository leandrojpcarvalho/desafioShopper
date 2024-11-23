import express from 'express';
import { Route } from '../types';

const defaultRoute = express.Router();

defaultRoute.get('/', (req, res) => {
    res.send('Hello World');
});

const routes: Route = [defaultRoute];

export default routes;