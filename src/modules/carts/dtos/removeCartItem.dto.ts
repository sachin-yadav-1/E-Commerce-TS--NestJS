import { IsString } from "class-validator";

export class RemoveCartItemDto {
  @IsString()
  cart: string;

  @IsString()
  itemId: string;
}
