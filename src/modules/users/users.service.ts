import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dtos/createUser.dto";
import IUser from "./interfaces/user.interface";
import { encryptPass } from "../../helpers/passwordHelpers";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly user: Model<IUser>) {}

  async createNewUser(data: CreateUserDto): Promise<any> {
    if (await this.checkExistingUser({ email: data.email, mobile: data.mobile })) {
      throw new ConflictException("user with this email or mobile already exists.");
    }

    data.password = await encryptPass(data.password);

    return (await this.user.create(data)).toObject();
  }

  async checkExistingUser(data: { email: string; mobile: string }): Promise<boolean> {
    const $or = [];
    if (data.email) $or.push({ email: data.email });
    if (data.mobile) $or.push({ mobile: data.mobile });

    const exists = await this.user.findOne({ $or });
    if (exists) return true;
    return false;
  }
}
