import { Schema, SchemaTypes } from "mongoose";

const AddressSchema = new Schema(
  {
    user: { type: SchemaTypes.ObjectId, required: [true, "user id required."] },
    label: { type: String, default: "" },
    recipientName: { type: String, default: "" },
    recipientMobile: { type: String, maxLength: 10, default: "" },
    recipientCC: { type: String, maxLength: 4, default: "" },
    line1: { type: String, minLength: 10, maxLength: 30, default: "" },
    line2: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    pincode: { type: String, minLength: 6, maxLength: 6, default: "" },
  },
  { timestamps: true }
);

export default AddressSchema;
