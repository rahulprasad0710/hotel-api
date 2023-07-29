import { PER_PAGE_DEFAULT, PAGE_NUMBER } from "../constant/pagination.js";

class Pagination {
    constructor(perPage, pageNumber) {
        this.perPage = perPage ?? PER_PAGE_DEFAULT;
        this.pageNumber = pageNumber ?? PAGE_NUMBER;
    }
}

export default Pagination;
