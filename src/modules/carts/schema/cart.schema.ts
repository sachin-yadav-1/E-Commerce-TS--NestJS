import { Schema } from "mongoose";

const CartSchema = new Schema(
  {
    amount: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    items: [{ type: Schema.Types.ObjectId, ref: "CartItem", default: [] }],
  },
  { timestamps: true }
);

export default CartSchema;
