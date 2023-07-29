import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
    },
    landMark: {
        type: String,
    },
    ward: {
        type: Number,
        required: true,
    },
    townCity: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
    },
    geoLocation: {
        latitude: {
            type: Number,
            required: false,
        },
        longitude: {
            type: Number,
            required: false,
        },
    },
});

const addressModel = mongoose.model("Address", addressSchema);

export default addressModel;
