import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UsersService } from "./users.service";
import { Serialize } from "../../interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Serialize(UserDto)
  async createNewUser(@Body() data: CreateUserDto): Promise<any> {
    return await this.usersService.createNewUser(data);
  }
}
