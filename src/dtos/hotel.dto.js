export class HotelDto {
    constructor(
        name,
        description,
        type,
        thumbnil,
        logo,
        images,
        address,
        rooms,
        slug,
        lowestPrice,
        highestPrice
    ) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.thumbnil = thumbnil;
        this.logo = logo;
        this.images = images;
        this.priceRange = {
            lowestPrice,
            highestPrice,
        };
        this.address = address;
        this.rooms = rooms;
        this.slug = slug;
    }
}

export class HotelFilter {
    constructor(searchTerm, type, lowestPrice, highestPrice) {
        this.searchTerm = searchTerm;
        this.type = type;
        this.priceRange = {
            lowestPrice,
            highestPrice,
        };
    }
}

export class Sorting {
    constructor(sortBy, sortOrder) {
        this.sortBy = sortBy ?? "name";
        this.sortOrder = sortOrder === "DEC" ? -1 : 1;
    }
}
