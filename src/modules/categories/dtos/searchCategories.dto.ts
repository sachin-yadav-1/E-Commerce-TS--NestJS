import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class SearchCategoriesDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => String(value).toUpperCase())
  name?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit?: number;
}
