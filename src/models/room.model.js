import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema(
    {
        hotel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel",
        },
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
        relavnce: {
            type: Number,
            default: 1,
        },
        roomNumbers: [
            {
                roomNo: String,
                unAvailablesDate: {
                    type: [Date],
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const RoomType = mongoose.model("RoomType", roomTypeSchema);

export default RoomType;
