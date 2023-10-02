import { IsOptional, IsString } from "class-validator";
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
  cc?: string;

  @IsString()
  @IsOptional()
  active?: boolean;
}
