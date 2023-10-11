import { Document } from "mongoose";
import IUser from "../../users/interfaces/user.interface";

export interface IBanner extends Document {
  web: string;
  mob: string;
  name: string;
  active: boolean;
  redirectAt: string;
  createdBy: string | IUser;
  updatedBy: string | IUser;
}
