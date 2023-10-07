import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class AddCartItemDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  count: number;

  @IsString()
  cart: string;

  @IsString()
  product: string;
}
