import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { DeleteDocumentDto } from "../../common/dtos/deleteDocument.dto";
import { Authorized } from "../../decorators/authorized.decorator";
import { CurrentUser } from "../../decorators/currentUser.decorator";
import { Serialize } from "../../interceptors/serialize.interceptor";
import { UserRoles } from "../users/enums/userRoles.enum";
import IUser from "../users/interfaces/user.interface";
import { CreateReviewDto } from "./dtos/createReview.dto";
import { PaginatedReviewsDto, ReviewDto } from "./dtos/review.dto";
import { SearchReviewDto } from "./dtos/searchReview.dto";
import { UpdateReviewDto } from "./dtos/updateReview.dto";
import { IPaginatedReviews } from "./interfaces/paginatedReviews.interface";
import { IReview } from "./interfaces/review.interface";
import { ReviewsService } from "./reviews.service";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Serialize(ReviewDto)
  @Authorized(UserRoles.USER)
  async createReview(@Body() data: CreateReviewDto, @CurrentUser() authUser: IUser): Promise<IReview> {
    return await this.reviewsService.createNewReview(data, authUser);
  }

  @Get("search")
  @Serialize(PaginatedReviewsDto)
  async searchReviews(@Query() data: SearchReviewDto): Promise<IPaginatedReviews> {
    return await this.reviewsService.searchReviews(data);
  }

  @Patch()
  @Serialize(ReviewDto)
  @Authorized(UserRoles.USER)
  async updateReview(@Body() data: UpdateReviewDto): Promise<IReview> {
    return await this.reviewsService.updateReview(data);
  }

  @Get(":id")
  @Serialize(ReviewDto)
  async getReviewById(@Param("id") id: string): Promise<IReview> {
    return await this.reviewsService.getReviewByID(id);
  }

  @Delete(":id")
  @Authorized(UserRoles.USER)
  @Serialize(DeleteDocumentDto)
  async deleteReview(@Param("id") id: string): Promise<{ id: string }> {
    return await this.reviewsService.deleteReview(id);
  }
}
