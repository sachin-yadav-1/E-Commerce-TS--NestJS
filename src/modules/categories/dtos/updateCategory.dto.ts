import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => String(value).toUpperCase())
  name?: string;
}
