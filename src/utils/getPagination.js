const getPagination = (pageNumber, perPage, total) => {
    const skip = (pageNumber - 1) * perPage;
    const totalPages = Math.ceil(total / perPage);
    return [skip, totalPages];
};

export default getPagination;
