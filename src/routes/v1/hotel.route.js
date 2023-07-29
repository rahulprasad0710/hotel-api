import express from "express";
import asyncTryCatchFn from "../../utils/tryCatch.js";
import hotelController from "../../controllers/hotel.controller.js";
import RequestValidator from "../../middlewares/RequestValidator.js";
import {
    hotelValidator,
    hotelQueryValidator,
} from "../../validator/hotel.validotor.js";

const router = express.Router();

// Docs
/**
 * @swagger
 * tags:
 *   name: Hotel
 *   description: Hotel management and retrieval.
 */

// @ GET /api/v1/hotels --> getHotels

/**
 * @swagger
 * /api/v1/hotels:
 *   get:
 *     summary: Get all hotels.
 *     description: Retrieve a list of all hotels with optional query parameters for pagination and filtering.
 *     tags: [Hotel]
 *     parameters:
 *       - name: pageNumber
 *         in: query
 *         description: The page number to retrieve (e.g., 1, 2, 3, ...).
 *         required: false
 *         schema:
 *           type: number
 *       - name: perPage
 *         in: query
 *         description: The number of items per page (e.g., 10, 20, 30, ...).
 *         required: false
 *         schema:
 *           type: number
 *       - name: searchTerm
 *         in: query
 *         description: A search term to filter hotels by name or description.
 *         required: false
 *         schema:
 *           type: string
 *       - name: type
 *         in: query
 *         description: The type of hotel (e.g., 'budget', 'luxury', 'resort', ...).
 *         required: false
 *         schema:
 *           type: string
 *           enum: ['budget', 'luxury', 'resort', '...']  # Add more enum values as needed
 *       - name: lowestPrice
 *         in: query
 *         description: The lowest price of  room in the hotels to filter by.
 *         required: false
 *         schema:
 *           type: number
 *       - name: highestPrice
 *         in: query
 *         description: The highest room price of  room in the hotels to filter by.
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Successful response. Returns a list of hotels.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     # Define the structure of a single hotel item in the array
 *                     type: object
 *                     properties:
 *                       # Add the properties of a hotel here
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       # ... (add more properties as needed)
 *                 message:
 *                   type: string
 *                   example: Hotels fetched successfully
 *                 status:
 *                   type: number
 *                   example: 200
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     pageNumber:
 *                       type: number
 *                     perPage:
 *                       type: number
 *                     totalCounts:
 *                       type: number
 *                 filters:
 *                   type: object
 *                   properties:
 *                     searchTerm:
 *                       type: string
 *                     type:
 *                       type: string
 *                       enum: ['budget', 'luxury', 'resort', ...]  # Add more enum values as needed
 *                     lowestPrice:
 *                       type: number
 *                     highestPrice:
 *                       type: number
 */

router
    .get(
        "",
        RequestValidator(hotelQueryValidator, "query"),
        asyncTryCatchFn(hotelController.getHotels)
    )
    .post(
        "",
        RequestValidator(hotelValidator),
        asyncTryCatchFn(hotelController.addHotel)
    )
    .get("/:slug", asyncTryCatchFn(hotelController.getHotelBySlug))
    .get("/h/:id", asyncTryCatchFn(hotelController.getHotelById));

export default router;
