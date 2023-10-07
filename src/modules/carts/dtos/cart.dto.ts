import { Expose, Type } from "class-transformer";
import { ICartItem } from "../interfaces/cartItem.interface";
import { CartItemDto } from "./cartItem.dto";

export class CartDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  amount: number;

  @Expose()
  @Type(() => CartItemDto)
  items: ICartItem[];
}
