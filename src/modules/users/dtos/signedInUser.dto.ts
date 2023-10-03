import { Expose, Type } from "class-transformer";

export class SignedInUserDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  role: string;

  @Expose()
  email: string;

  @Expose()
  mobile: string;

  @Expose()
  cc: string;

  @Expose()
  token: string;
}
