const addPagination = (page: number, skip: number, limit: number) => ({
  $facet: {
    metadata: [
      { $count: "total" },
      {
        $addFields: {
          limit,
          currentPage: page,
          totalPages: { $ceil: { $divide: ["$total", limit] } },
        },
      },
    ],
    data: [{ $skip: skip }, { $limit: limit }],
  },
});

export default addPagination;
