import { Transform } from "class-transformer";
import { IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @Transform(({ value }) => String(value).toUpperCase())
  name: string;
}
