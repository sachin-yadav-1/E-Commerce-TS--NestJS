import { IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateReviewDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  review?: string;

  @IsString()
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;
}
