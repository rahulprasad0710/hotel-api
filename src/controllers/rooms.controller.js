import roomService from "../services/room.service.js";
import { RoomTypeFilter, RoomTypeSorting } from "../dtos/roomType.dto.js";
import Pagination from "../dtos/pagination.dto.js";
import AppError from "../utils/AppError.js";
import { redisClient } from "../config/redis.config.js";

const addRoomType = async (req, res) => {
    const { body } = req;
    const { hotelId } = req.params;
    const room = await roomService.addRoomType(body, hotelId);
    res.status(201).send(room);
};

const getRoomTypes = async (req, res) => {
    const dates = req.query.dates.split(",");
    const { name, maxPerson, pageNumber, perPage, sortBy, sortOrder } =
        req.query;
    const filter = new RoomTypeFilter(name, maxPerson, dates);
    const pagination = new Pagination(perPage, pageNumber);
    const sorting = new RoomTypeSorting(sortBy, sortOrder);

    const roomTypes = await roomService.getRoomTypes(
        filter,
        pagination,
        sorting
    );
    if (!roomTypes) throw new AppError("No room types found", 404);
    res.status(200).send(roomTypes);
};

const getRoomTypeById = async (req, res) => {
    const { roomTypeId } = req.params;
    const cachedResponse = await redisClient.get(roomTypeId);
    if (cachedResponse) {
        const data = JSON.parse(cachedResponse);
        return res.status(200).json({
            success: true,
            data,
            message: "hotel fetched successfully",
        });
    }
    const roomType = await roomService.getRoomTypeById(roomTypeId);
    if (!roomType) throw new AppError("No room type found", 404);
    return res.status(200).json({
        success: true,
        data: roomType,
        message: "hotel fetched successfully",
    });
};

const updateRoomType = async (req, res) => {
    const { roomTypeId } = req.params;
    const { body } = req;
    const roomType = await roomService.updateRoomType(roomTypeId, body);
    if (!roomType) throw new AppError("No room type found", 404);
    res.status(200).send(roomType);
};

const getRoomTypeByHotelId = async (req, res) => {
    const { hotelId } = req.params;
    const roomTypes = await roomService.getRoomTypeByHotelId(hotelId);
    if (!roomTypes) throw new AppError("No room types found", 404);
    res.status(200).send(roomTypes);
};

export default {
    addRoomType,
    getRoomTypes,
    getRoomTypeById,
    updateRoomType,
    getRoomTypeByHotelId,
};
