import RoomType from "../models/room.model.js";
import Hotel from "../models/hotel.model.js";

const addRoomType = async (roomType, hotelId) => {
    const data = new RoomType(roomType);
    const savedData = await data.save();

    await Hotel.findOneAndUpdate(hotelId, {
        $push: {
            rooms: savedData._id,
        },
    });

    return savedData;
};

export default {
    addRoomType,
};
