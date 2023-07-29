import joi from "joi";
import { HOTEL_FEATURED, HOTEL_TYPE } from "../constant/hotel.js";

export const hotelValidator = joi.object({
    title: joi.string().required(),
    websiteUrl: joi.string().uri().required(),
    description: joi.string(),
    type: joi
        .string()
        .valid(...HOTEL_TYPE)
        .required(),
    priceRange: joi
        .object({
            lowestPrice: joi.number().min(0).required(),
            highestPrice: joi.number(),
        })
        .required(),
    thumbnilId: joi.string().required(),
    logoId: joi.string().required(),
    imageIdArray: joi.array().items(joi.string()).required(),
    rooms: joi.array().items(joi.string()).required(),
    tags: joi.array().items(joi.string()).required(),
    featured: joi
        .string()
        .valid(...HOTEL_FEATURED)
        .required(),
});

export const hotelQueryValidator = joi.object({
    pageNumber: joi.number().min(1),
    perPage: joi.number().min(1),
    searchTerm: joi.string(),
    type: joi.string().valid(...HOTEL_TYPE),
    lowestPrice: joi.number().min(0),
    highestPrice: joi.number().min(0),
});
