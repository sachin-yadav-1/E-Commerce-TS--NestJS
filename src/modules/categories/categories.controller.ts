import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { DeleteDocumentDto } from "../../common/dtos/deleteDocument.dto";
import { Authorized } from "../../decorators/authorized.decorator";
import { CurrentUser } from "../../decorators/currentUser.decorator";
import { Serialize } from "../../interceptors/serialize.interceptor";
import { UserRoles } from "../users/enums/userRoles.enum";
import IUser from "../users/interfaces/user.interface";
import { CategoriesService } from "./categories.service";
import { CategoryDto, PaginateCategoryDto } from "./dtos/category.dto";
import { CreateCategoryDto } from "./dtos/createCategory.dto";
import { SearchCategoriesDto } from "./dtos/searchCategories.dto";
import { UpdateCategoryDto } from "./dtos/updateCategory.dto";
import { ICategory } from "./interfaces/category.interface";
import { IPaginatedCategories } from "./interfaces/paginatedCategories.interface";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Authorized(UserRoles.ADMIN)
  @Serialize(CategoryDto)
  async createNewCategory(@Body() data: CreateCategoryDto, @CurrentUser() authUser: IUser): Promise<ICategory> {
    return await this.categoriesService.createNewCategory(data, authUser);
  }

  @Get("search")
  @Serialize(PaginateCategoryDto)
  async searchCategories(@Query() data: SearchCategoriesDto): Promise<IPaginatedCategories> {
    return await this.categoriesService.searchCategories(data);
  }

  @Patch()
  @Authorized(UserRoles.ADMIN)
  @Serialize(CategoryDto)
  async updateCategory(@Body() data: UpdateCategoryDto, @CurrentUser() authUser: IUser): Promise<ICategory> {
    return await this.categoriesService.updateCategory(data, authUser);
  }

  @Get(":id")
  @Serialize(CategoryDto)
  async getCategoryByID(@Param("id") id: string): Promise<ICategory> {
    return await this.categoriesService.getCategoryByID(id);
  }

  @Delete(":id")
  @Authorized(UserRoles.ADMIN)
  @Serialize(DeleteDocumentDto)
  async deleteCategory(@Param("id") id: string): Promise<{ id: string }> {
    return await this.categoriesService.deleteCategory(id);
  }
}
