import express from "express";

import authRoute from "./auth.route.js";
import hotelRoute from "./hotel.route.js";
import fileUploadRoute from "./fileUpload.route.js";

const router = express.Router();

const routes = [
    {
        path: "/auth",
        route: authRoute,
    },
    {
        path: "/hotels",
        route: hotelRoute,
    },
    {
        path: "/file-uploads",
        route: fileUploadRoute,
    },
];

// apply middleware to all routes

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
