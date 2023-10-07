import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { ProductImageDto } from "./productImage.dto";

export class UpdateProductDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  desc?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => Number(value))
  costPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => Number(value))
  price?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => Number(value))
  stock?: number;

  @IsString({ each: true })
  @IsOptional()
  categories?: string[];

  @ValidateNested()
  @IsOptional()
  @Type(() => ProductImageDto)
  featImg?: { web: string; mob: string };

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ProductImageDto)
  imgs: { web: string; mob: string }[];
}
