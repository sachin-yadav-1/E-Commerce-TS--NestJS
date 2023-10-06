import { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, minLength: 3, required: [true, "product name is required."] },
    desc: { type: String, default: "" },
    costPrice: { type: Number, required: [true, "cost price is required."] },
    sellingPrice: { type: Number, required: [true, "selling price is required."] },
    stock: { type: Number, default: 10 },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    featImg: { web: { type: String, default: "" }, mob: { type: String, default: "" } },
    imgs: [{ web: { type: String, default: "" }, mob: { type: String, default: "" } }],
  },
  { timestamps: true }
);

export default ProductSchema;
