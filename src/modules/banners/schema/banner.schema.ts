import { Schema } from "mongoose";

const BannerSchema = new Schema(
  {
    web: { type: String, required: true },
    mob: { type: String, required: true },
    name: { type: String, required: true },
    redirectAt: { type: String, default: "" },
    active: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

export default BannerSchema;
