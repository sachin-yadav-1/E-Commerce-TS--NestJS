import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EventTypes } from "../../common/enums/events.enum";
import { IProduct } from "../products/interfaces/product.interface";
import IUser from "../users/interfaces/user.interface";
import { AddCartItemDto } from "./dtos/addCartItem.dto";
import { ICart } from "./interfaces/cart.interface";
import { ICartItem } from "./interfaces/cartItem.interface";

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
    if (!cart) throw new NotFoundException("cart not found.");

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
}
