import { Expose, Type } from "class-transformer";
import { PaginateMetaDataDto } from "../../../common/dtos/paginateMetadata.dto";
import { PaginateMetaData } from "../../../common/types/paginateMetadata.type";
import { CategoryDto } from "../../categories/dtos/category.dto";
import { ICategory } from "../../categories/interfaces/category.interface";
import { RestrictedUserDto } from "../../users/dtos/restrictedUser.dto";
import IUser from "../../users/interfaces/user.interface";
import { IProduct } from "../interfaces/product.interface";

export class ProductDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  name: string;

  @Expose()
  desc: string;

  @Expose()
  costPrice: number;

  @Expose()
  sellingPrice: number;

  @Expose()
  stock: number;

  @Expose()
  @Type(() => CategoryDto)
  categories: ICategory[];

  @Expose()
  @Type(() => RestrictedUserDto)
  createdBy: IUser;

  @Expose()
  @Type(() => RestrictedUserDto)
  updatedBy: IUser;

  @Expose()
  featImg: { web: string; mob: string };

  @Expose()
  imgs: { web: string; mob: string }[];
}

export class PaginateProductsDto {
  @Expose()
  @Type(() => PaginateMetaDataDto)
  metadata: PaginateMetaData;

  @Expose()
  @Type(() => ProductDto)
  data: IProduct[];
}
