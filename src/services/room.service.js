import RoomType from "../models/room.model.js";
import Hotel from "../models/hotel.model.js";
import pagination from "../utils/getPagination.js";

const addRoomType = async (roomType, hotelId) => {
    const data = {
        hotel: hotelId,
        name: roomType.name,
        description: roomType.description,
        maxPerson: roomType.maxPerson,
        roomType: roomType.roomType,
        beds: roomType.beds,
        amenities: roomType.amenities,
        price: roomType.price,
        thumbnil: roomType.thumbnil,
        images: roomType.images,
        roomNumbers: roomType.roomNumbers,
    };
    const newRoom = new RoomType(data);
    const savedData = await newRoom.save();

    await Hotel.findOneAndUpdate(hotelId, {
        $push: {
            rooms: savedData._id,
        },
    });

    return savedData;
};

const getRoomTypes = async (
    { name, maxPerson, dates },
    { pageNumber, perPage },
    { sortBy, sortOrder }
) => {
    const filter = {};
    if (name) {
        filter.name = name;
    }
    if (maxPerson) {
        filter.maxPerson = {
            $gte: maxPerson,
        };
    }

    if (dates) {
        filter["roomNumbers.unAvailablesDate"] = { $nin: dates };
    }

    const sort = { [sortBy]: sortOrder };
    const total = await Hotel.countDocuments(filter);
    const [skip, totalPages] = pagination(pageNumber, perPage, total);

    const rooms = await RoomType.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(perPage)
        .populate("thumbnil")
        .populate("images");
    return {
        rooms,
        filters: {
            name,
            maxPerson,
        },
        pagination: {
            perPage,
            totalPages,
            totalResults: total,
            pageNumber,
        },
    };
};

const getRoomTypeByHotelId = async (hotelId) => {
    const data = await Hotel.findById(hotelId).populate({
        path: "rooms",
        populate: {
            path: "thumbnil",
        },
    });
    return data.rooms;
};

const getRoomTypeById = async (id) => {
    const data = await Hotel.findById(id);
    return data;
};

const updateRoomType = async (id, roomType) => {
    const updatedRoom = await RoomType.findByIdAndUpdate(id, roomType, {
        new: true,
        runValidators: true,
    });
    return updatedRoom;
};

export default {
    addRoomType,
    getRoomTypes,
    getRoomTypeById,
    getRoomTypeByHotelId,
    updateRoomType,
};
