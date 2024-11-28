import Joi from 'joi';
import { EstimateRequest, RideConfirmRequest } from '../../../utils/types';

const schemaEstimate = Joi.object<EstimateRequest, true, EstimateRequest>({
    customer_id: Joi.string().required(),
    origin: Joi.string().required(),
    destination: Joi.string().required()
});

const schemaRide = Joi.object<RideConfirmRequest, true, RideConfirmRequest>({
    customer_id: Joi.string().required(),
    origin: Joi.string().required(),
    destination: Joi.string().required(),
    driver: Joi.object().required(),
    distance: Joi.number().required(),
    duration: Joi.string().required(),
    value: Joi.number().required()
});

export default {
    estimate: schemaEstimate,
    ride: schemaRide
};