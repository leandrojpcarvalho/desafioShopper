import *  as Joi from 'joi';
import Estimate from '../../../interface/estimate.interface';
import { EstimateRequest } from '../../../types';

const schemaEstimate = Joi.object<EstimateRequest, true, EstimateRequest>({
    customer_id: Joi.string().required(),
    origin: Joi.string().required(),
    destination: Joi.string().required()
});

export default {
    estimate: schemaEstimate
};