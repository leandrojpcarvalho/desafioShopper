import express, { RequestHandler } from 'express';
import Estimate from './interface/estimate.interface';

export type Route = express.Router[] | RequestHandler[];
export type Remove<T, R extends keyof T> = Omit<T, R>;

export type EstimateRequest = Remove<Estimate, 'customer_id'> & { customer_id: string };