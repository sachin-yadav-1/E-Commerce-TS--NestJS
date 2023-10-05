import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class SearchAddressDto {
  @IsString()
  @IsOptional()
  user?: string;

  @IsString()
  @IsOptional()
  recipientMobile?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value ? String(value).toLowerCase() : undefined))
  label?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  pincode?: string;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
