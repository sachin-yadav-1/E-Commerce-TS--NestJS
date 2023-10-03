import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../../guards/localAuth.guard";
import { Serialize } from "../../interceptors/serialize.interceptor";
import { SignedInUserDto } from "../users/dtos/signedInUser.dto";
import { AuthService } from "./auth.service";
import { SignupUserDto } from "./dtos/signupUser.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalAuthGuard)
  @Serialize(SignedInUserDto)
  async login(@Req() req: any): Promise<any> {
    return await this.authService.signInUser(req.user);
  }

  @Post("signup")
  @Serialize(SignedInUserDto)
  async signupUser(@Body() data: SignupUserDto): Promise<any> {
    return await this.authService.signupUser(data);
  }
}
