import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { capitaliseString } from "../../../helpers/stringHelpers";

export class SignupUserDto {
  @IsString()
  @Transform(({ value }) => capitaliseString(value))
  firstName: string;

  @IsString()
  @Transform(({ value }) => capitaliseString(value))
  lastName: string;

  @IsString()
  @Transform(({ value }) => String(value).toLowerCase())
  email: string;

  @IsString()
  password: string;
}
