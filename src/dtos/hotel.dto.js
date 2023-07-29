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
