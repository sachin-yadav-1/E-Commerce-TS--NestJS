import { Document } from "mongoose";
import IUser from "../../users/interfaces/user.interface";
import { ICartItem } from "./cartItem.interface";

export interface ICart extends Document {
  amount: number;
  active: boolean;
  user: string | IUser;
  items: string[] | ICartItem[];
}
