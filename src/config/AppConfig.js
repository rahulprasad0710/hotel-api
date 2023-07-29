import dotenv from "dotenv";

dotenv.config();

const AppConfig = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    REDIS_URL: process.env.REDIS_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
    JWT_COOKIE_NAME: process.env.JWT_COOKIE_NAME,
    JWT_COOKIE_HTTP_ONLY: process.env.JWT_COOKIE_HTTP_ONLY,
    JWT_COOKIE_SECURE: process.env.JWT_COOKIE_SECURE,
    JWT_COOKIE_SAME_SITE: process.env.JWT_COOKIE_SAME_SITE,
    JWT_COOKIE_DOMAIN: process.env.JWT_COOKIE_DOMAIN,
    JWT_COOKIE_PATH: process.env.JWT_COOKIE_PATH,
    JWT_COOKIE_MAX_AGE: process.env.JWT_COOKIE_MAX_AGE,
    JWT_COOKIE_SIGNED: process.env.JWT_COOKIE_SIGNED,
    JWT_COOKIE_OVERWRITE: process.env.JWT_COOKIE_OVERWRITE,
    BASE_URL: process.env.BASE_URL,
};

export default AppConfig;
