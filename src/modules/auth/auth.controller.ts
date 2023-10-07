import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Authorized } from "../../decorators/authorized.decorator";
import { GoogleAuthGuard } from "../../guards/googleAuth.guard";
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

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  async googleOAuthHandler(@Req() req: any, @Res({ passthrough: true }) res: any): Promise<any> {
    const resp = await this.authService.loginWithGoogle(req.user);
    res.status(200).redirect(`http://localhost:3000/logged-in`);
  }

  @Get("profile")
  @Authorized()
  @Serialize(SignedInUserDto)
  async getCurrentlyLoggedInUser(@Req() req: any): Promise<any> {
    return req.user;
  }
}
