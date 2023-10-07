import { Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  cc: string;
  role: string;
  password: string;
  active: boolean;
  avatar: string;
  provider: string;
}

export default IUser;
