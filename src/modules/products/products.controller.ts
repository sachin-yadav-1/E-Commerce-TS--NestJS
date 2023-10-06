import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { DeleteDocumentDto } from "../../common/dtos/deleteDocument.dto";
import { Authorized } from "../../decorators/authorized.decorator";
import { CurrentUser } from "../../decorators/currentUser.decorator";
import { Serialize } from "../../interceptors/serialize.interceptor";
import { UserRoles } from "../users/enums/userRoles.enum";
import IUser from "../users/interfaces/user.interface";
import { CreateProductDto } from "./dtos/createProduct.dto";
import { PaginateProductsDto, ProductDto } from "./dtos/product.dto";
import { SearchProductsDto } from "./dtos/searchProducts.dto";
import { UpdateProductDto } from "./dtos/updateProduct.dto";
import { IPaginatedProducts } from "./interfaces/paginatedProducts.interface";
import { IProduct } from "./interfaces/product.interface";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Serialize(ProductDto)
  @Authorized(UserRoles.ADMIN)
  async createNewProduct(@Body() data: CreateProductDto, @CurrentUser() authUser: IUser): Promise<IProduct> {
    return await this.productsService.createNewProduct(data, authUser);
  }

  @Get("search")
  @Serialize(PaginateProductsDto)
  async searchProducts(@Query() data: SearchProductsDto): Promise<IPaginatedProducts> {
    return await this.productsService.searchProducts(data);
  }

  @Patch()
  @Serialize(ProductDto)
  @Authorized(UserRoles.ADMIN)
  async updateProduct(@Body() data: UpdateProductDto, @CurrentUser() authUser: IUser): Promise<IProduct> {
    return await this.productsService.updateProduct(data, authUser);
  }

  @Get(":id")
  @Serialize(ProductDto)
  @Authorized(UserRoles.ADMIN)
  async getProductByID(@Param("id") id: string): Promise<IProduct> {
    return await this.productsService.getProductByID(id);
  }

  @Delete(":id")
  @Authorized(UserRoles.ADMIN)
  @Serialize(DeleteDocumentDto)
  async deleteProduct(@Param("id") id: string): Promise<{ id: string }> {
    return await this.productsService.deleteProduct(id);
  }
}
