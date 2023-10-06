import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import addPagination from "../../helpers/addPagination";
import IUser from "../users/interfaces/user.interface";
import { CreateCategoryDto } from "./dtos/createCategory.dto";
import { SearchCategoriesDto } from "./dtos/searchCategories.dto";
import { UpdateCategoryDto } from "./dtos/updateCategory.dto";
import { ICategory } from "./interfaces/category.interface";
import { IPaginatedCategories } from "./interfaces/paginatedCategories.interface";

@Injectable()
export class CategoriesService {
  constructor(@InjectModel("Category") private readonly category: Model<ICategory>) {}

  async createNewCategory(data: CreateCategoryDto, authUser: IUser): Promise<ICategory> {
    if (await this.categoryExists({ name: data.name })) {
      throw new ConflictException(`category with name ${data.name} already exists.`);
    }

    const category = await this.category.create({ ...data, createdBy: authUser._id });
    return await this.category.findById(category._id).populate(["createdBy", "updatedBy"]).lean(true);
  }

  async categoryExists(data: { name: string }): Promise<boolean> {
    const exists = await this.category.findOne({ name: data.name });
    if (exists) return true;
    return false;
  }

  async getCategoryByID(id: string): Promise<ICategory> {
    if (!id) throw new BadRequestException("id is required.");

    const category = await this.category.findById(id).populate(["createdBy", "updatedBy"]).lean(true);
    if (!category) throw new NotFoundException("category not found.");

    return category;
  }

  async searchCategories(filter: SearchCategoriesDto): Promise<IPaginatedCategories> {
    const matchFilter = {};
    const or = [];

    if (Object.keys(filter).length) {
      if (filter.name) or.push({ name: { $regex: ".*" + filter.name + ".*", $options: "i" } });
    }

    if (or.length) matchFilter["$or"] = or;

    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const skip = (page - 1) * limit;

    const categories = (await this.category.aggregate([{ $match: matchFilter }, { ...addPagination(page, skip, limit) }])) as any;
    return categories;
  }

  async updateCategory(data: UpdateCategoryDto, authUser: IUser): Promise<ICategory> {
    const { id, ...updateData } = data;

    if (!id) throw new BadRequestException("id is required.");

    const category = await this.category
      .findByIdAndUpdate(id, { ...updateData, updatedBy: authUser._id })
      .populate(["createdBy", "updatedBy"])
      .lean(true);
    if (!category) throw new NotFoundException("category not found.");

    return category;
  }

  async deleteCategory(id: string): Promise<{ id: string }> {
    if (!id) throw new BadRequestException("id is required.");

    const category = await this.category.findByIdAndDelete(id).lean(true);
    if (!category) throw new NotFoundException("category not found.");

    return { id };
  }
}
