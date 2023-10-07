import { Transform } from "class-transformer";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { capitaliseString } from "../../../helpers/stringHelpers";

export class CreateOAuthUserDto {
  @IsString()
  @Transform(({ value }) => capitaliseString(String(value)))
  firstName: string;

  @IsString()
  @Transform(({ value }) => capitaliseString(String(value)))
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  provider?: string;
}
