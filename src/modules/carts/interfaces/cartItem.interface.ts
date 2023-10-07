import { Document } from "mongoose";
import { IProduct } from "../../products/interfaces/product.interface";
import { ICart } from "./cart.interface";

export interface ICartItem extends Document {
  amount: number;
  count: number;
  cart: string | ICart;
  product: string | IProduct;
}
