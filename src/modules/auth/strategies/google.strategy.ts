import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { LoginProvider } from "../../users/enums/loginProviders.enum";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_KEY,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      scope: ["profile", "email"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void> {
    const { name, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      avatar: photos[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      provider: LoginProvider.GOOGLE,
    };

    done(null, user);
  }
}
