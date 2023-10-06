import { Document } from "mongoose";
import IUser from "../../users/interfaces/user.interface";

export interface ICategory extends Document {
  name: string;
  createdBy: string | IUser;
}
