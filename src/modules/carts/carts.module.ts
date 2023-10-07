import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CartsController } from "./carts.controller";
import { CartsService } from "./carts.service";
import CartSchema from "./schema/cart.schema";
import CartItemSchema from "./schema/cartItem.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Cart", schema: CartSchema },
      { name: "CartItem", schema: CartItemSchema },
    ]),
  ],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
