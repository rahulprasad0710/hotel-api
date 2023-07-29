/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createClient } from "redis";

export const redisClient = createClient();

const connectRedis = () => {
    try {
        redisClient.on("error", (err) =>
            console.log("Redis Client Error", err)
        );
        redisClient.on("connect", () => console.log("Redis Client Connected"));

        redisClient.connect(6379, () => {
            console.log("Redis Client Connected");
        });
    } catch (error) {
        console.log(error);
    }
};

export default connectRedis;
