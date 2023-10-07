import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EventTypes } from "../../common/enums/events.enum";
import { IProduct } from "../products/interfaces/product.interface";
import IUser from "../users/interfaces/user.interface";
import { AddCartItemDto } from "./dtos/addCartItem.dto";
import { RemoveCartItemDto } from "./dtos/removeCartItem.dto";
import { ICart } from "./interfaces/cart.interface";
import { ICartItem } from "./interfaces/cartItem.interface";
import { UpdateCartItemDto } from "./dtos/updateCartItem.dto";

@Injectable()
export class CartsService {
  constructor(
    @InjectModel("Cart") private readonly cart: Model<ICart>,
    @InjectModel("CartItem") private readonly cartItem: Model<ICartItem>,

    private readonly eventEmitter: EventEmitter2
  ) {}

  async getActiveUserCart(authUser: IUser): Promise<ICart> {
    const cart = await this.cart.findOneAndUpdate({ user: authUser._id, active: true }, {}, { upsert: true, new: true }).lean(true);
    return cart;
  }

  async addItemToCart(data: AddCartItemDto): Promise<any> {
    const { cart: id, count, product: productID } = data;

    const cart = await this.cart.findById(id).populate("items").lean(true);
    if (!cart || !cart.active) throw new NotFoundException("cart not found.");

    const itemExists = cart.items.find((item: ICartItem) => String(item.product) === String(productID));
    if (itemExists) throw new ConflictException("item already exists in cart.");

    const [product] = (await this.eventEmitter.emitAsync(EventTypes["ADD_CART_ITEM.GET_PRODUCT"], { id: productID })) as IProduct[];
    if (!product) throw new NotFoundException("product not found.");
    if (product.stock === 0) throw new ConflictException("product out of stock.");

    const amount = count * product.price;

    const cartItem = await this.cartItem.create({ amount, cart: id, product: productID, count });

    let cartTotal = cart.items.length ? cart.items.reduce((t: number, i: ICartItem) => (t += i.amount), 0) : 0;
    cartTotal += amount;

    return await this.cart
      .findByIdAndUpdate(id, { amount: cartTotal, $push: { items: cartItem._id } }, { new: true })
      .populate(["items", { path: "items", populate: "product" }])
      .lean(true);
  }

  async removeItemFromCart(data: RemoveCartItemDto): Promise<ICart> {
    const cart = await this.cart.findById(data.cart).lean(true);
    if (!cart || !cart.active) throw new NotFoundException("cart not found.");

    const item = await this.cartItem.findById(data.itemId).populate("product").lean(true);
    if (!item) throw new NotFoundException("cart item not found.");

    const itemExists = cart.items.find((i: string) => String(i) === String(data.itemId));
    if (!itemExists) throw new BadRequestException("no such item in cart.");

    const updated = await this.cart
      .findByIdAndUpdate(cart._id, { amount: cart.amount - item.product["price"], $pull: { items: data.itemId } }, { new: true })
      .populate(["items", { path: "items", populate: "product" }])
      .lean(true);

    await this.cartItem.findByIdAndDelete(item._id);
    return updated;
  }

  async updateCartItem(data: UpdateCartItemDto): Promise<ICart> {
    const { cart: id, count, itemId } = data;

    const cart = await this.cart.findById(id).lean(true);
    if (!cart || !cart.active) throw new NotFoundException("cart not found.");

    const cartItem = await this.cartItem.findById(itemId).populate("product").lean(true);
    if (!cartItem) throw new NotFoundException("cart item not found.");

    const itemExists = cart.items.find((i: string) => String(i) === String(data.itemId));
    if (!itemExists) throw new BadRequestException("no such item in cart.");

    const itemAmount = count * cartItem.product["price"];
    const cartAmount = cart.amount - itemAmount;

    await this.cartItem.findByIdAndUpdate(itemId, { count, amount: itemAmount });
    return await this.cart
      .findByIdAndUpdate(cart._id, { amount: cartAmount }, { new: true })
      .populate(["items", { path: "items", populate: "product" }])
      .lean(true);
  }
}
