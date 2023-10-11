import { IsString } from "class-validator";

export class CreateBannerDto {
  @IsString()
  web: string;

  @IsString()
  mob: string;

  @IsString()
  name: string;

  @IsString()
  redirectAt: string;
}
