import { IsOptional, IsString } from "class-validator";

export class ProductImageDto {
  @IsString()
  @IsOptional()
  web: string;

  @IsString()
  @IsOptional()
  mob: string;
}
