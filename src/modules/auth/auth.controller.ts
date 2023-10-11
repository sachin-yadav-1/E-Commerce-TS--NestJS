import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { Authorized } from "../../decorators/authorized.decorator";
import { GoogleAuthGuard } from "../../guards/googleAuth.guard";
import { LocalAuthGuard } from "../../guards/localAuth.guard";
import { Serialize } from "../../interceptors/serialize.interceptor";
import { UserDto } from "../users/dtos/user.dto";
import { AuthService } from "./auth.service";
import { SignupUserDto } from "./dtos/signupUser.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalAuthGuard)
  @Serialize(UserDto)
  async login(@Req() req: any, @Res() res: Response): Promise<any> {
    const { token, ...user } = await this.authService.signInUser(req.user);
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV === "production" });
    res.status(200).send(user);
  }

  @Post("signup")
  @Serialize(UserDto)
  async signupUser(@Body() data: SignupUserDto, @Res() res: Response): Promise<any> {
    const { token, ...user } = await this.authService.signupUser(data);
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV === "production" });
    res.status(201).send(user);
  }

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  async googleOAuthHandler(@Req() req: any, @Res({ passthrough: true }) res: any): Promise<any> {
    const { token } = await this.authService.loginWithGoogle(req.user);
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV === "production" });
    res.status(200).redirect(`http://localhost:3000/profile`);
  }

  @Get("profile")
  @Authorized()
  @Serialize(UserDto)
  async getCurrentlyLoggedInUser(@Req() req: any): Promise<any> {
    return req.user;
  }
}
