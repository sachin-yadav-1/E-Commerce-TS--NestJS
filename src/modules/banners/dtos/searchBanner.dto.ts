import { IsNumber, IsOptional, IsString } from "class-validator";
import { StringRegexSearch } from "../../../common/types/stringRegexSearch.type";
import { Transform } from "class-transformer";

export class SearchBannerDto {
  @IsString()
  @IsOptional()
  name?: string | StringRegexSearch;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit?: number;
}
