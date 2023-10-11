import { Expose } from "class-transformer";

export class BannerDto {
  @Expose()
  name: string;

  @Expose()
  web: string;

  @Expose()
  mob: string;

  @Expose()
  redirectAt: string;
}
