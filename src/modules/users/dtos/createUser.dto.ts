import { Transform } from "class-transformer";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { capitaliseString } from "../../../helpers/stringHelpers";

export class CreateUserDto {
  @IsString()
  @Transform(({ value }) => capitaliseString(String(value)))
  firstName: string;

  @IsString()
  @Transform(({ value }) => capitaliseString(String(value)))
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  cc?: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(10)
  mobile?: string;
}
