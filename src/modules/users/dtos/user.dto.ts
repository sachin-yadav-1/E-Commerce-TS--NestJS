import { Expose, Type } from "class-transformer";

export class UserDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  mobile: string;

  @Expose()
  cc: string;
}
