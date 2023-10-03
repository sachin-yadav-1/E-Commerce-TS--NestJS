import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { Serialize } from "../../interceptors/serialize.interceptor";
import { CreateUserDto } from "./dtos/createUser.dto";
import { SearchUsersDto } from "./dtos/searchUsers.dto";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { PaginateUserDto, UserDto } from "./dtos/user.dto";
import IUser from "./interfaces/user.interface";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Serialize(UserDto)
  async createNewUser(@Body() data: CreateUserDto): Promise<IUser> {
    return await this.usersService.createNewUser(data);
  }

  @Get("search")
  @Serialize(PaginateUserDto)
  async searchUsers(@Query() data: SearchUsersDto): Promise<IUser[]> {
    return await this.usersService.searchUsers(data);
  }

  @Get()
  @Serialize(UserDto)
  async getUserByID(@Query("id") id: string): Promise<IUser> {
    return await this.usersService.getUserByID(id);
  }

  @Patch()
  @Serialize(UserDto)
  async updateUser(@Body() data: UpdateUserDto): Promise<IUser> {
    return await this.usersService.updateUser(data);
  }
}
