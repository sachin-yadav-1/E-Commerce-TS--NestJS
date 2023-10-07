import { Schema } from "mongoose";

const CartItemSchema = new Schema(
  {
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    amount: { type: Number, required: [true, "amount is required."] },
    count: { type: Number, required: [true, "product count is required."] },
  },
  { timestamps: true }
);

export default CartItemSchema;
