import { Expose, Type } from "class-transformer";
import { ProductDto } from "../../products/dtos/product.dto";
import { IProduct } from "../../products/interfaces/product.interface";

export class CartItemDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  amount: number;

  @Expose()
  count: number;

  @Expose()
  @Type(() => ProductDto)
  product: IProduct;
}
