import { Expose, Type } from "class-transformer";
import { PaginateMetaDataDto } from "../../../common/dtos/paginateMetadata.dto";
import { PaginateMetaData } from "../../../common/types/paginateMetadata.type";
import { RestrictedUserDto } from "../../users/dtos/restrictedUser.dto";
import IUser from "../../users/interfaces/user.interface";
import { IAddress } from "../interfaces/address.interface";

export class AddressDto {
  @Expose()
  @Type(() => RestrictedUserDto)
  user: IUser;

  @Expose()
  recipientName: string;

  @Expose()
  label: string;

  @Expose()
  recipientMobile: string;

  @Expose()
  recipientCC?: string;

  @Expose()
  line1: string;

  @Expose()
  line2?: string;

  @Expose()
  city: string;

  @Expose()
  state: string;

  @Expose()
  pincode: string;
}

export class PaginateAddressDto {
  @Expose()
  @Type(() => PaginateMetaDataDto)
  metadata: PaginateMetaData;

  @Expose()
  @Type(() => AddressDto)
  data: IAddress[];
}
