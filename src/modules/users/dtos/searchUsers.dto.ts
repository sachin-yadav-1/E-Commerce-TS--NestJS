import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { StringRegexSearch } from "../../../common/types/stringRegexSearch.type";

export class SearchUsersDto {
  @IsString()
  @IsOptional()
  firstName?: string | StringRegexSearch;

  @IsString()
  @IsOptional()
  lastName?: string | StringRegexSearch;

  @IsString()
  @IsOptional()
  email?: string | StringRegexSearch;

  @IsString()
  @IsOptional()
  mobile?: string | StringRegexSearch;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  cc?: string;

  @IsString()
  @IsOptional()
  active?: boolean;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit?: number;
}
