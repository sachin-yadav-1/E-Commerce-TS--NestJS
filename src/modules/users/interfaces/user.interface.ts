import { Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  cc: string;
  password: string;
  active: boolean;
}

export default IUser;