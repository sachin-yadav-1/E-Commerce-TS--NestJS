import { Expose, Type } from "class-transformer";

export class RestrictedProductDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  featImg: { web: string; mob: string };
}
