import { Expose, Type } from "class-transformer";
import { PaginateMetaDataDto } from "../../../common/dtos/paginateMetadata.dto";
import { PaginateMetaData } from "../../../common/types/paginateMetadata.type";
import { RestrictedProductDto } from "../../products/dtos/restrictedProduct.dto";
import { IProduct } from "../../products/interfaces/product.interface";
import { RestrictedUserDto } from "../../users/dtos/restrictedUser.dto";
import IUser from "../../users/interfaces/user.interface";
import { IReview } from "../interfaces/review.interface";

export class ReviewDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  @Type(() => RestrictedUserDto)
  user: IUser;

  @Expose()
  @Type(() => RestrictedProductDto)
  product: IProduct;

  @Expose()
  review: string;

  @Expose()
  rating: number;
}

export class PaginatedReviewsDto {
  @Expose()
  @Type(() => PaginateMetaDataDto)
  metadata: PaginateMetaData;

  @Expose()
  @Type(() => ReviewDto)
  data: IReview[];
}
