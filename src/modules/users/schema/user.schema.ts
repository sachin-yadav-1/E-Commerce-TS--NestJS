import { Schema } from "mongoose";
import { UserRoles } from "../enums/userRoles.enum";
import { LoginProvider } from "../enums/loginProviders.enum";

const UserSchema = new Schema(
  {
    firstName: { type: String, maxlength: 10, required: [true, "first name is required"] },
    lastName: { type: String, maxlength: 10, required: [true, "last name is required"] },
    email: { type: String, required: [true, "email is required"] },
    mobile: { type: String, maxLen: 10, required: false, default: "" },
    cc: { type: String, maxlength: 4, required: false, default: "" },
    role: { type: String, enum: UserRoles, default: UserRoles.USER },
    avatar: { type: String, default: "" },

    password: { type: String, default: "" },
    active: { type: Boolean, default: true },
    provider: { type: String, enum: LoginProvider, default: LoginProvider.NONE },
  },
  { timestamps: true }
);

export default UserSchema;
