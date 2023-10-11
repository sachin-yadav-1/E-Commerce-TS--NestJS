import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { DeleteDocumentDto } from "../../common/dtos/deleteDocument.dto";
import { Authorized } from "../../decorators/authorized.decorator";
import { CurrentUser } from "../../decorators/currentUser.decorator";
import { Serialize } from "../../interceptors/serialize.interceptor";
import { UserRoles } from "../users/enums/userRoles.enum";
import IUser from "../users/interfaces/user.interface";
import { BannersService } from "./banners.service";
import { BannerDto } from "./dtos/banner.dto";
import { CreateBannerDto } from "./dtos/createBanner.dto";
import { SearchBannerDto } from "./dtos/searchBanner.dto";
import { UpdateBannerDto } from "./dtos/updateBanner.dto";
import { IBanner } from "./interfaces/banner.interface";
import { IPaginatedBanners } from "./interfaces/paginatedBanners.interface";

@Controller("banners")
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  @Serialize(BannerDto)
  @Authorized(UserRoles.ADMIN)
  async createNewBanner(@Body() data: CreateBannerDto, @CurrentUser() authUser: IUser): Promise<IBanner> {
    return await this.bannersService.createNewBanner(data, authUser);
  }

  @Get("search")
  async searchBanners(@Body() data: SearchBannerDto): Promise<IPaginatedBanners> {
    return await this.bannersService.searchBanners(data);
  }

  @Patch()
  @Serialize(BannerDto)
  @Authorized(UserRoles.ADMIN)
  async updateBanner(@Body() data: UpdateBannerDto, @CurrentUser() authUser: IUser): Promise<IBanner> {
    return await this.bannersService.updateBanner(data, authUser);
  }

  @Get(":id")
  @Serialize(BannerDto)
  async getBannerByID(@Param("id") id: string): Promise<IBanner> {
    return await this.bannersService.getBannerByID(id);
  }

  @Delete(":id")
  @Authorized(UserRoles.ADMIN)
  @Serialize(DeleteDocumentDto)
  async deleteBanner(@Param("id") id: string): Promise<{ id: string }> {
    return await this.bannersService.deleteBanner(id);
  }
}
