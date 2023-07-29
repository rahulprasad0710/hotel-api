/* eslint-disable no-console */
import mongoose from "mongoose";
import configSetting from "../config/AppConfig.js";
import logger from "../utils/logger.js";

const { DB_URL } = configSetting;

// eslint-disable-next-line consistent-return
const connectDB = async () => {
    try {
        const response = await mongoose.connect(DB_URL);

        console.log(`Mongo db connected: ${response.connection.host}`);
        return response;
    } catch (error) {
        logger.error("DB NOT CONNECTED", error);
        console.log("DB NOT CONNECTED", error);
        process.exit(1);
    }
};

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
    console.log(err.message);
});

export default connectDB;
