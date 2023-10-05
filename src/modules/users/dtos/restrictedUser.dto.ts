import { Expose } from "class-transformer";

export class RestrictedUserDto {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;
}
