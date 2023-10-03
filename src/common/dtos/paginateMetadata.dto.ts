import { Expose } from "class-transformer";

export class PaginateMetaDataDto {
  @Expose()
  total: number;

  @Expose()
  limit: number;

  @Expose()
  currentPage: number;

  @Expose()
  totalPages: number;
}
