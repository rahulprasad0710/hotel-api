import mongoose from "mongoose";
import { HOTEL_TYPE, HOTEL_FEATURED, HOTEL_STATUS } from "../constant/hotel.js";

const hotelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
    },
    websiteUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },

    type: {
        type: String,
        enum: HOTEL_TYPE,
    },
    priceRange: {
        lowestPrice: {
            type: Number,
            min: 0,
        },
        highestPrice: {
            type: Number,
        },
    },
    thumbnil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileData",
    },
    logo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileData",
    },
    images: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FileData",
            },
        ],
    },
    rooms: {
        type: [String],
    },
    tags: [String],
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    },
    featured: {
        type: String,
        enum: HOTEL_FEATURED,
    },
    status: {
        type: String,
        enum: HOTEL_STATUS,
        default: "ACTIVE",
    },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
