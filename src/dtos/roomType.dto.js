export class RoomTypeFilter {
    constructor(name, maxPerson, dates) {
        this.name = name;
        this.maxPerson = maxPerson;
        this.dates = dates;
    }
}

export class RoomTypeSorting {
    constructor(sortBy, sortOrder) {
        this.sortBy = sortBy ?? "relavance";
        this.sortOrder = sortOrder === "DEC" ? -1 : 1;
    }
}
