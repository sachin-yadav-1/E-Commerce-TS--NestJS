import { Expose, Type } from "class-transformer";
import { PaginateMetaDataDto } from "../../../common/dtos/paginateMetadata.dto";
import { PaginateMetaData } from "../../../common/types/paginateMetadata.type";
import { RestrictedUserDto } from "../../users/dtos/restrictedUser.dto";
import IUser from "../../users/interfaces/user.interface";
import { ICategory } from "../interfaces/category.interface";

export class CategoryDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => RestrictedUserDto)
  createdBy: IUser;

  @Expose()
  @Type(() => RestrictedUserDto)
  updatedBy: IUser;
}

export class PaginateCategoryDto {
  @Expose()
  @Type(() => PaginateMetaDataDto)
  metadata: PaginateMetaData;

  @Expose()
  @Type(() => CategoryDto)
  data: ICategory[];
}
