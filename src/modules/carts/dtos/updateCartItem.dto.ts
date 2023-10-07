import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCartItemDto {
  @IsString()
  cart: string;

  @IsString()
  itemId: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  count: number;
}
