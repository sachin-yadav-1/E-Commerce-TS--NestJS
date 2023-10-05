import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { DeleteDocumentDto } from "../../common/dtos/deleteDocument.dto";
import { Authorized } from "../../decorators/authorized.decorator";
import { CurrentUser } from "../../decorators/currentUser.decorator";
import { Serialize } from "../../interceptors/serialize.interceptor";
import { UserRoles } from "../users/enums/userRoles.enum";
import IUser from "../users/interfaces/user.interface";
import { AddressesService } from "./addresses.service";
import { AddressDto, PaginateAddressDto } from "./dtos/address.dto";
import { CreateAddressDto } from "./dtos/createAddress.dto";
import { SearchAddressDto } from "./dtos/searchAddress.dto";
import { UpdateAddressDto } from "./dtos/updateAddress.dto";
import { IAddress } from "./interfaces/address.interface";
import { IPaginatedAddresses } from "./interfaces/paginatedAddresses.interface";

@Controller("addresses")
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @Authorized()
  @Serialize(AddressDto)
  async createNewAddress(@Body() data: CreateAddressDto, @CurrentUser() user: IUser): Promise<IAddress> {
    return await this.addressesService.createAddress(data, user);
  }

  @Get(":id")
  @Authorized(UserRoles.USER)
  @Serialize(AddressDto)
  async getAddressByID(@Param("id") id: string): Promise<IAddress> {
    return await this.addressesService.getAddressByID(id);
  }

  @Get("search")
  @Authorized(UserRoles.USER)
  @Serialize(PaginateAddressDto)
  async searchAddresses(@Query() data: SearchAddressDto): Promise<IPaginatedAddresses> {
    return await this.addressesService.searchAddresses(data);
  }

  @Patch()
  @Authorized(UserRoles.USER)
  @Serialize(AddressDto)
  async updateAddress(@Body() data: UpdateAddressDto): Promise<IAddress> {
    return await this.addressesService.updateAddress(data);
  }

  @Delete(":id")
  @Serialize(DeleteDocumentDto)
  async deleteAddress(@Param("id") id: string): Promise<{ id: string }> {
    return await this.addressesService.deleteAddress(id);
  }
}
