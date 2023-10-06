import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @Type(() => String)
  id: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  mobile?: string;

  @IsString()
  @IsOptional()
  cc?: string;
}
