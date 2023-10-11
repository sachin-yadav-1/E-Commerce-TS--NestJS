import { IPaginateData } from "../../../common/interfaces/paginateData.interface";
import { IReview } from "./review.interface";

export interface IPaginatedReviews extends IPaginateData {
  data: IReview[];
}
