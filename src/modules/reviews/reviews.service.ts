import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import addPagination from "../../helpers/addPagination";
import IUser from "../users/interfaces/user.interface";
import { CreateReviewDto } from "./dtos/createReview.dto";
import { SearchReviewDto } from "./dtos/searchReview.dto";
import { UpdateReviewDto } from "./dtos/updateReview.dto";
import { IPaginatedReviews } from "./interfaces/paginatedReviews.interface";
import { IReview } from "./interfaces/review.interface";

@Injectable()
export class ReviewsService {
  constructor(@InjectModel("Review") private readonly review: Model<IReview>) {}

  async createNewReview(data: CreateReviewDto, authUser: IUser): Promise<IReview> {
    if (await this.checkIfExists(authUser._id, data.product)) {
      throw new ConflictException("review already exists on the product.");
    }

    const review = await this.review.create({ ...data, user: authUser._id });
    return await this.review.findById(review._id).populate(["product", "user"]).lean(true);
  }

  async checkIfExists(user: string, product: string): Promise<boolean> {
    const exists = await this.review.findOne({ user, product });
    return exists ? true : false;
  }

  async searchReviews(filter: SearchReviewDto): Promise<IPaginatedReviews> {
    const matchFilter = {};
    const or = [];

    if (Object.keys(filter).length) {
      if (filter.user) or.push({ user: filter.user });
      if (filter.product) or.push({ product: filter.product });
      if (filter.rating) or.push({ rating: { $gte: filter.rating } });
    }

    if (or.length) matchFilter["$or"] = or;

    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const skip = (page - 1) * limit;

    const reviews = (await this.review.aggregate([{ $match: matchFilter }, { ...addPagination(page, skip, limit) }])) as any;
    return reviews;
  }

  async getReviewByID(id: string): Promise<IReview> {
    if (!id) throw new BadRequestException("id is required.");

    const review = await this.review.findById(id).populate(["user", "product"]).lean(true);
    if (!review) throw new NotFoundException("review not found.");

    return review;
  }

  async updateReview(data: UpdateReviewDto): Promise<IReview> {
    const { id, ...updateData } = data;

    const review = await this.review.findByIdAndUpdate(id, updateData, { new: true }).populate(["user", "product"]).lean(true);
    if (!review) throw new NotFoundException("review not found.");

    return review;
  }

  async deleteReview(id: string): Promise<{ id: string }> {
    if (!id) throw new BadRequestException("id is required.");

    const review = await this.review.findByIdAndDelete(id);
    if (!review) throw new NotFoundException("review not found.");

    return { id };
  }
}
