import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import addPagination from "../../helpers/addPagination";
import IUser from "../users/interfaces/user.interface";
import { CreateBannerDto } from "./dtos/createBanner.dto";
import { SearchBannerDto } from "./dtos/searchBanner.dto";
import { UpdateBannerDto } from "./dtos/updateBanner.dto";
import { IBanner } from "./interfaces/banner.interface";
import { IPaginatedBanners } from "./interfaces/paginatedBanners.interface";

@Injectable()
export class BannersService {
  constructor(@InjectModel("Banner") private readonly banner: Model<IBanner>) {}

  async createNewBanner(data: CreateBannerDto, authUser: IUser): Promise<IBanner> {
    if (await this.checkIfExists(data.name)) {
      throw new ConflictException(`banner with name ${data.name} already exists.`);
    }

    return (await this.banner.create({ ...data, createdBy: authUser._id })).toObject();
  }

  async checkIfExists(name: string): Promise<boolean> {
    const exists = await this.banner.findOne({ name });
    return exists ? true : false;
  }

  async getBannerByID(id: string): Promise<IBanner> {
    if (!id) throw new BadRequestException("id is required.");

    const banner = await this.banner.findById(id).lean(true);
    if (!banner) throw new NotFoundException("banner not found.");

    return banner;
  }

  async searchBanners(filter: SearchBannerDto): Promise<IPaginatedBanners> {
    if (filter.name) filter["name"] = { $regex: ".*" + filter.name + ".", $options: "i" };

    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const skip = (page - 1) * limit;

    const banners = (await this.banner.aggregate([{ $match: filter }, { ...addPagination(page, skip, limit) }])) as any;
    return banners;
  }

  async updateBanner(data: UpdateBannerDto, authUser: IUser): Promise<IBanner> {
    const { id, ...updateData } = data;

    const banner = await this.banner.findByIdAndUpdate(id, { ...updateData, updatedBy: authUser._id }, { new: true }).lean(true);
    return banner;
  }

  async deleteBanner(id: string): Promise<{ id: string }> {
    if (!id) throw new BadRequestException("id is required.");

    const banner = await this.banner.findByIdAndDelete(id);
    if (!banner) throw new NotFoundException("banner not found.");

    return { id };
  }
}
