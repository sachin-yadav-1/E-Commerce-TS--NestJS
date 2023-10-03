import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { verifyPass } from "../../../helpers/passwordHelpers";
import { UsersService } from "../../users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string): Promise<any> {
    email = String(email).toLowerCase();

    const user = await this.usersService.getUserByEmail(email);

    if (!user || !(await verifyPass(password, user.password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
