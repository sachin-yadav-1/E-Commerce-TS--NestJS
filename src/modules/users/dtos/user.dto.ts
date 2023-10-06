import { Expose, Type } from "class-transformer";
import { PaginateMetaDataDto } from "../../../common/dtos/paginateMetadata.dto";
import { PaginateMetaData } from "../../../common/types/paginateMetadata.type";
import IUser from "../interfaces/user.interface";

export class UserDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  avatar: string;

  @Expose()
  role: string;

  @Expose()
  email: string;

  @Expose()
  mobile: string;

  @Expose()
  cc: string;
}

export class PaginateUserDto {
  @Expose()
  @Type(() => PaginateMetaDataDto)
  metadata: PaginateMetaData;

  @Expose()
  @Type(() => UserDto)
  data: IUser[];
}
