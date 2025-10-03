import Joi from "joi";
import { isValidObjectId } from "mongoose";

export const createContactSchema = Joi.object({
    userId: Joi.string().custom((value, helper) => {
        if (value && !isValidObjectId(value)) {
            return helper.message('User id should be a valid mongo id');
        }
        return true;
    }),
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
    email: Joi.string().email().required(),
    isFavourite: Joi.boolean(),
contactType: Joi.string().valid("home", "work", "personal"),
});


export const updateContactSchema = Joi.object({
name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().pattern(/^\+?[0-9]{10,15}$/),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
contactType: Joi.string().valid("home", "work", "personal"),
});


