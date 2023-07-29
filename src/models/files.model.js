import mongoose from "mongoose";
import { fileRelatedToArray } from "../constant/fileUpload.js";

import configSetting from "../config/AppConfig.js";

const { BASE_URL } = configSetting;

const FileDataSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true,
        },
        originalname: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        extension: {
            type: String,
            required: true,
        },
        mimetype: {
            type: String,
        },
        fileType: {
            type: String,
        },
        relatedTo: {
            type: String,
            enum: fileRelatedToArray,
        },
        dimensions: {
            width: {
                type: Number,
                default: 0,
                required: false,
            },
            height: {
                type: Number,
                default: 0,
                required: false,
            },
        },
        cloudPath: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

FileDataSchema.virtual("pathName").get(function setFilePath() {
    return `${BASE_URL}/uploads/${this.relatedTo}/${this.filename}`;
});

FileDataSchema.set("toObject", { virtuals: true });
FileDataSchema.set("toJSON", { virtuals: true });

export const FileData = mongoose.model("FileData", FileDataSchema);
