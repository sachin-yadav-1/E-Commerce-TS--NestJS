import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class SearchReviewDto {
  @IsString()
  @IsOptional()
  user?: string;

  @IsString()
  @IsOptional()
  product?: string;

  @IsString()
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit?: number;
}
