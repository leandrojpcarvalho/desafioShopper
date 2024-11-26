import express, { NextFunction, Request, Response } from 'express';
import { Routes } from '../utils/types';
import { MapMessage } from '../utils/EnumError';
import { StatusCodes } from 'http-status-codes';
import RideController from '../layers/controller/ride.controller.';

const defaultRoute = express.Router();

const instanceController = new RideController();

defaultRoute.patch('/ride/confirm', instanceController.getMethod('confirm'));
defaultRoute.post('/ride/estimate', instanceController.getMethod('estimate'));
defaultRoute.get('/ride/:customer_id', instanceController.getMethod('getRideByCustomerAndDriver'));


const routes: Routes = [defaultRoute];

export default routes;