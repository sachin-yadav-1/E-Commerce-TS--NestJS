import { Document } from "mongoose";

export interface IReview extends Document {
  user: string;
  product: string;
  review: string;
  rating: number;
}
