export interface IPaginateData {
  metadata: {
    total: number;
    limit: number;
    currentPage: number;
    totalPages: number;
  };
}
