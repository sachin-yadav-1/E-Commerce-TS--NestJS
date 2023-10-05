import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import IUser from "../users/interfaces/user.interface";
import { UsersService } from "../users/users.service";
import { SignupUserDto } from "./dtos/signupUser.dto";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  async signInUser(user: IUser): Promise<any> {
    const token = await this.jwtService.signAsync({ id: user._id, email: user.email });
    return { ...user, token };
  }

  async signupUser(data: SignupUserDto): Promise<any> {
    const user = await this.usersService.createNewUser(data);
    return await this.signInUser(user);
  }
}
