import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EventTypes } from "../../common/enums/events.enum";
import addPagination from "../../helpers/addPagination";
import IUser from "../users/interfaces/user.interface";
import { CreateProductDto } from "./dtos/createProduct.dto";
import { SearchProductsDto } from "./dtos/searchProducts.dto";
import { UpdateProductDto } from "./dtos/updateProduct.dto";
import { IPaginatedProducts } from "./interfaces/paginatedProducts.interface";
import { IProduct } from "./interfaces/product.interface";

@Injectable()
export class ProductsService {
  constructor(@InjectModel("Product") private readonly product: Model<IProduct>) {}

  async createNewProduct(data: CreateProductDto, authUser: IUser): Promise<IProduct> {
    if (await this.checkExisting(data.name)) {
      throw new ConflictException(`product with name ${data.name} already exists.`);
    }

    const product = await this.product.create({ ...data, createdBy: authUser._id });
    return await this.product.findById(product._id).populate(["createdBy", "updatedBy", "categories"]).lean(true);
  }

  async checkExisting(name: string): Promise<boolean> {
    const exists = await this.product.findOne({ name });
    if (exists) return true;
    return false;
  }

  async getProductByID(id: string): Promise<IProduct> {
    if (!id) throw new BadRequestException("id is required.");

    const product = await this.product.findById(id).lean(true);
    if (!product) throw new NotFoundException("product not found.");

    return product;
  }

  @OnEvent(EventTypes["ADD_CART_ITEM.GET_PRODUCT"], { async: true, promisify: true })
  async getProductForAddCartItem({ id }: { id: string }): Promise<IProduct> {
    if (!id) throw new BadRequestException("id is required.");

    const product = await this.product.findById(id).lean(true);
    if (!product) throw new NotFoundException("product not found.");

    return product;
  }

  async searchProducts(filter: SearchProductsDto): Promise<IPaginatedProducts> {
    const matchFilter = {};
    const and = [];

    if (Object.keys(filter).length) {
      if (filter.price) and.push({ price: { $lte: filter.price } });
      if (filter.hasOwnProperty("inStock")) and.push({ stock: { $gte: 1 } });
      if (filter.costPrice) and.push({ costPrice: { $lte: filter.costPrice } });
      if (filter.categories) and.push({ categories: { $in: filter.categories } });
      if (filter.name) and.push({ name: { $regex: ".*" + filter.name + ".*", $options: "i" } });
    }

    if (and.length) matchFilter["$and"] = and;

    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const skip = (page - 1) * limit;

    const products = (await this.product.aggregate([{ $match: matchFilter }, { ...addPagination(page, skip, limit) }])) as any;
    return products;
  }

  async updateProduct(data: UpdateProductDto, authUser: IUser): Promise<IProduct> {
    const { id, ...updateData } = data;

    const product = await this.product.findByIdAndUpdate(id, { ...updateData, updatedBy: authUser._id }, { new: true }).lean(true);
    if (!product) throw new NotFoundException("product not found.");

    return product;
  }

  async deleteProduct(id: string): Promise<{ id: string }> {
    if (!id) throw new BadRequestException("id is required.");

    const product = await this.product.findByIdAndDelete(id);
    if (!product) throw new NotFoundException("product not found.");

    return { id };
  }
}
