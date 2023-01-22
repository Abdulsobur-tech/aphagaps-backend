import { join } from "@prisma/client/runtime";
import Joi from "joi";

export const attandeeValidation = Joi.object({
    firstname: Joi.string().trim().required(),
    lastname: Joi.string().trim().required(),
    email: Joi.string().email().lowercase().required(),
    phone: Joi.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    password: Joi.string().required(),
    confirmpassword: Joi.ref('password')
}).with('password', 'confirmpassword');

export const updateAttandeeValidation = Joi.object({
    firstname: Joi.string().trim().required(),
    lastname: Joi.string().trim().required(),
    email: Joi.string().email().lowercase().required(),
    phone: Joi.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required()
});

export const talkValidation = Joi.object({
    title: Joi.string().trim().required(),
    location: Joi.string().trim().required(),
    date: Joi.date().required(),
    describtion: Joi.string().trim().required(),
});

export const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};