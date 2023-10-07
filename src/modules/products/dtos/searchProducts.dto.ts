import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { StringRegexSearch } from "../../../common/types/stringRegexSearch.type";

export class SearchProductsDto {
  @IsString()
  name: string | StringRegexSearch;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  costPrice: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  price: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => Boolean(value))
  inStock?: boolean;

  @IsString({ each: true })
  @IsOptional()
  categories?: string[];

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit?: number;
}
