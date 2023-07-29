// Hotel - hotelService
import Hotel from "../models/hotel.model.js";
import slugFn from "../utils/slugId.js";

const addHotel = async (hotel) => {
    const slug = slugFn.slugName(hotel.title);
    const data = {
        title: hotel.title,
        slug,
        websiteUrl: hotel.websiteUrl,
        description: hotel.description,
        type: hotel.type,
        priceRange: {
            lowestPrice: hotel.lowestPrice,
            highestPrice: hotel.highestPrice,
        },
        thumbnil: hotel.thumbnilId,
        logo: hotel.logoId,
        images: hotel.imageIdArray,
        tags: hotel.tags,
        featuredIn: hotel.featuredIn,
    };

    const newHotel = new Hotel(data);
    const savedData = await newHotel.save();

    const hotelData = await Hotel.findById(savedData._id).populate(
        "thumbnil logo images"
    );
    return hotelData;
};

const getHotels = async (
    { searchTerm, type, lowestPrice, highestPrice },
    { pageNumber, perPage },
    { sortBy, sortOrder }
) => {
    const sort = { [sortBy]: sortOrder };
    // filter starts here
    const filter = {};
    if (searchTerm) {
        filter.$or = [
            { title: { $regex: searchTerm, $options: "i" } },
            { type: { $regex: searchTerm, $options: "i" } },
        ];
    }

    if (type) {
        filter.type = type;
    }
    if (lowestPrice && highestPrice) {
        filter.priceRange = {
            $gte: lowestPrice,
            $lte: highestPrice,
        };
    }

    // filter ends here
    // pagination starts here
    const skip = (pageNumber - 1) * perPage;
    const total = await Hotel.countDocuments(filter);
    const totalPages = Math.ceil(total / perPage);
    // pagination ends here
    console.log({ filter, sort, skip, perPage });
    const hotels = await Hotel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(perPage)
        .select("-__v")
        .populate("thumbnil")
        .populate("logo");

    return {
        hotels,
        filters: {
            searchTerm,
            type,
            lowestPrice,
            highestPrice,
        },
        pagination: {
            perPage,
            totalPages,
            totalResults: total,
            pageNumber,
        },
    };
};

const getHotelById = async (id) => {
    const data = Hotel.findById(id);
    return data;
};

const getHotelsByslug = async (slug) => {
    const data = Hotel.findOne({ slug });
    return data;
};

export default {
    addHotel,
    getHotels,
    getHotelById,
    getHotelsByslug,
};
