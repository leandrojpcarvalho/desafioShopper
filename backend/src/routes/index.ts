import express, { NextFunction, Request, Response } from 'express';
import { Routes } from '../utils/types';
import { MapMessage } from '../utils/EnumError';
import { StatusCodes } from 'http-status-codes';
import RideController from '../layers/controller/ride.controller.';
import MiddlewareFactory from '../layers/middleware/Middleware';

const defaultRoute = express.Router();

const instanceController = new RideController();
const middlewareEstimate = MiddlewareFactory.validade('estimate');
const middlewareRide = MiddlewareFactory.validade('ride');


defaultRoute.patch('/ride/confirm', middlewareRide, instanceController.getMethod('confirm'));
defaultRoute.post('/ride/estimate', middlewareEstimate, instanceController.getMethod('estimate'));
defaultRoute.get('/ride/:customer_id', instanceController.getMethod('getRideByCustomerAndDriver'));


const routes: Routes = [defaultRoute];

export default routes;