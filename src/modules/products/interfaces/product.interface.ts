import { Document } from "mongoose";
import { ICategory } from "../../categories/interfaces/category.interface";
import IUser from "../../users/interfaces/user.interface";

export interface IProduct extends Document {
  name: string;
  desc: string;
  costPrice: number;
  price: number;
  stock: number;
  categories: string[] | ICategory[];
  createdBy: string | IUser;
  updatedBy: string | IUser;
  featImg: { web: string; mob: string };
  imgs: { web: string; mob: string }[];
}
