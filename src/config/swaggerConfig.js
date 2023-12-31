import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Hotel Booking API",
            version: "1.0.0",
            description: "API documentation using Swagger",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./src/routes/*.js", "./src/routes/v1/*.js"],
};

export default swaggerJsdoc(options);
