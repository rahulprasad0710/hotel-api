import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    maxPerson: {
        type: Number,
        required: true,
    },
    roomType: {
        type: String,
        required: true,
    },
    beds: {
        type: [String],
        required: true,
    },
    amenities: {
        type: [String],
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnil: {
        type: String,
    },
    images: {
        type: [String],
    },
    roomNumbers: [
        {
            roomNo: String,
            unAvailablesDate: {
                type: [Date],
            },
        },
    ],
});

const RoomType = mongoose.model("RoomType", roomTypeSchema);

export default RoomType;
