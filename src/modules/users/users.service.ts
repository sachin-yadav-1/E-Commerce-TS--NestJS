import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import addPagination from "../../helpers/addPagination";
import { encryptPass } from "../../helpers/passwordHelpers";
import { CreateUserDto } from "./dtos/createUser.dto";
import { SearchUsersDto } from "./dtos/searchUsers.dto";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { IPaginatedUsers } from "./interfaces/paginatedUsers.interface";
import IUser from "./interfaces/user.interface";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly user: Model<IUser>) {}

  async createNewUser(data: CreateUserDto): Promise<IUser> {
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

  async getUserByID(id: string): Promise<IUser> {
    if (!id) throw new BadRequestException("id is required.");

    const user = await this.user.findById(id).lean(true);
    if (!user) throw new NotFoundException("user not found.");

    return user;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    if (!email) throw new BadRequestException("id is required.");

    const user = await this.user.findOne({ email }).lean(true);
    if (!user) throw new NotFoundException("user not found.");

    return user;
  }

  async searchUsers(filter: SearchUsersDto): Promise<IPaginatedUsers> {
    const matchFilter = {};
    const or = [];

    if (Object.keys(filter).length) {
      if (filter.cc) or.push({ cc: filter.cc });
      if (filter.role) or.push({ role: filter.role });
      if (filter.hasOwnProperty("active")) or.push({ active: filter.active });
      if (filter.email) or.push({ email: { $regex: ".*" + filter.email + ".*", $options: "i" } });
      if (filter.mobile) or.push({ mobile: { $regex: ".*" + filter.mobile + ".*", $options: "i" } });
      if (filter.firstName) or.push({ firstName: { $regex: ".*" + filter.firstName + ".*", $options: "i" } });
      if (filter.lastName) or.push({ lastName: { $regex: ".*" + filter.lastName + ".*", $options: "i" } });
    }

    if (or.length) matchFilter["$or"] = or;

    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const skip = (page - 1) * limit;

    const users = (await this.user.aggregate([{ $match: matchFilter }, { ...addPagination(page, skip, limit) }])) as any;
    return users;
  }

  async updateUser(data: UpdateUserDto): Promise<IUser> {
    const { id, ...updateData } = data;

    const user = await this.user.findByIdAndUpdate(id, updateData, { new: true }).lean(true);
    if (!user) throw new NotFoundException("user not found.");

    return user;
  }
}
