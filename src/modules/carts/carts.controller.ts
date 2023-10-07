import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { Authorized } from "../../decorators/authorized.decorator";
import { CurrentUser } from "../../decorators/currentUser.decorator";
import { Serialize } from "../../interceptors/serialize.interceptor";
import { UserRoles } from "../users/enums/userRoles.enum";
import IUser from "../users/interfaces/user.interface";
import { CartsService } from "./carts.service";
import { AddCartItemDto } from "./dtos/addCartItem.dto";
import { CartDto } from "./dtos/cart.dto";
import { RemoveCartItemDto } from "./dtos/removeCartItem.dto";
import { UpdateCartItemDto } from "./dtos/updateCartItem.dto";
import { ICart } from "./interfaces/cart.interface";

@Controller("carts")
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get("user")
  @Serialize(CartDto)
  @Authorized(UserRoles.USER)
  async getUserCart(@CurrentUser() authUser: IUser): Promise<ICart> {
    return await this.cartsService.getActiveUserCart(authUser);
  }

  @Post("item")
  @Serialize(CartDto)
  @Authorized(UserRoles.USER)
  async addItemToCart(@Body() data: AddCartItemDto): Promise<ICart> {
    return await this.cartsService.addItemToCart(data);
  }

  @Patch("item")
  @Serialize(CartDto)
  @Authorized(UserRoles.USER)
  async updateCartItem(@Body() data: UpdateCartItemDto): Promise<ICart> {
    return await this.cartsService.updateCartItem(data);
  }

  @Delete("item")
  @Serialize(CartDto)
  @Authorized(UserRoles.USER)
  async removeCartItem(@Body() data: RemoveCartItemDto): Promise<ICart> {
    return await this.cartsService.removeItemFromCart(data);
  }
}
