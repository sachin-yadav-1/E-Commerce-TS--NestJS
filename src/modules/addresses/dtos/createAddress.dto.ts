import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
  @IsString()
  @IsOptional()
  recipientName?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value ? String(value).toLowerCase() : ""))
  label?: string;

  @IsString()
  @IsOptional()
  recipientMobile?: string;

  @IsString()
  @IsOptional()
  recipientCC?: string;

  @IsString()
  line1: string;

  @IsString()
  @IsOptional()
  line2?: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  pincode: number;
}
