import { Expose, Type } from "class-transformer";
import { PaginateMetaDataDto } from "../../../common/dtos/paginateMetadata.dto";
import { PaginateMetaData } from "../../../common/types/paginateMetadata.type";
import { IBanner } from "../interfaces/banner.interface";

export class BannerDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  name: string;

  @Expose()
  web: string;

  @Expose()
  mob: string;

  @Expose()
  redirectAt: string;
}

export class PaginateBannersDto {
  @Expose()
  @Type(() => PaginateMetaDataDto)
  metadata: PaginateMetaData;

  @Expose()
  @Type(() => BannerDto)
  data: IBanner[];
}
