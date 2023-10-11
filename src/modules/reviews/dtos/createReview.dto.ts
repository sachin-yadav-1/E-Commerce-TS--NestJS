import { IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
  @IsString()
  product: string;

  @IsString()
  review: string;

  @IsString()
  @Min(1)
  @Max(5)
  rating: number;
}
