import { Module } from "@nestjs/common";
import { BannersService } from "./banners.service";
import { BannersController } from "./banners.controller";
import { MongooseModule } from "@nestjs/mongoose";
import BannerSchema from "./schema/banner.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Banner", schema: BannerSchema }])],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
