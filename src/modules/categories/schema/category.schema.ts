import { Schema, SchemaTypes } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: [true, "category name is required"] },
    createdBy: { type: SchemaTypes.ObjectId, ref: "User" },
    updatedBy: { type: SchemaTypes.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

export default CategorySchema;
