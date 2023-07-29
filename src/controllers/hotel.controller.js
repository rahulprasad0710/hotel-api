import hotelService from "../services/hotel.service.js";
import AppError from "../utils/AppError.js";
import Pagination from "../dtos/pagination.dto.js";
import { HotelFilter, Sorting } from "../dtos/hotel.dto.js";
import { redisClient } from "../config/redis.config.js";

const getHotels = async (req, res) => {
    const {
        pageNumber,
        perPage,
        searchTerm,
        type,
        lowestPrice,
        highestPrice,
        sortBy,
        sortOrder,
    } = req.query;

    const pagination = new Pagination(perPage, pageNumber);
    const filter = new HotelFilter(searchTerm, type, lowestPrice, highestPrice);
    const sorting = new Sorting(sortBy, sortOrder);

    const data = await hotelService.getHotels(filter, pagination, sorting);
    if (!data) throw new AppError("something Went wrong.", 500);

    return res.status(200).json({
        success: true,
        data,
        message: "hotels fetched successfully",
    });
};

const addHotel = async (req, res) => {
    const hotel = req.body;
    const data = await hotelService.addHotel(hotel);
    if (!data) throw new AppError("something Went wrong.", 500);

    return res.status(200).json({
        success: true,
        data,
        message: "hotels created successfully",
    });
};

const getHotelById = async (req, res) => {
    const { id } = req.params;
    const data = await hotelService.getHotelById(id);
    if (!data) throw new AppError("something Went wrong.", 500);

    return res.status(200).json({
        success: true,
        data,
        message: "hotel fetched successfully",
    });
};

const getHotelBySlug = async (req, res) => {
    const { slug } = req.params;
    const cachedResponse = await redisClient.get(slug);

    if (cachedResponse) {
        const data = JSON.parse(cachedResponse);
        console.log("from cache", data);
        return res.status(200).json({
            success: true,
            data,
            message: "hotel fetched successfully",
        });
    }
    const data = await hotelService.getHotelsByslug(slug);
    if (!data) throw new AppError("something Went wrong.", 500);
    redisClient.setEx(slug, 3600, JSON.stringify(data));
    return res.status(200).json({
        success: true,
        data,
        message: "hotel fetched successfully",
    });
};

export default {
    getHotels,
    getHotelById,
    getHotelBySlug,
    addHotel,
};
