import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class UpdateAddressDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  recipientName?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value ? String(value).toLowerCase() : undefined))
  label?: string;

  @IsString()
  @IsOptional()
  recipientMobile?: string;

  @IsString()
  @IsOptional()
  recipientCC?: string;

  @IsString()
  @IsOptional()
  line1?: string;

  @IsString()
  @IsOptional()
  line2?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  pincode?: number;
}
