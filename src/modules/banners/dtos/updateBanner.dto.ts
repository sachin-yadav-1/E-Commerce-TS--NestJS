import { Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateBannerDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  web?: string;

  @IsString()
  @IsOptional()
  mob?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  redirectAt?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (String(value) === "false" ? false : true))
  active?: boolean;
}
