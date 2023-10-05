import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import addPagination from "../../helpers/addPagination";
import IUser from "../users/interfaces/user.interface";
import { CreateAddressDto } from "./dtos/createAddress.dto";
import { SearchAddressDto } from "./dtos/searchAddress.dto";
import { UpdateAddressDto } from "./dtos/updateAddress.dto";
import { IAddress } from "./interfaces/address.interface";
import { IPaginatedAddresses } from "./interfaces/paginatedAddresses.interface";

@Injectable()
export class AddressesService {
  constructor(@InjectModel("Address") private readonly address: Model<IAddress>) {}

  async createAddress(data: CreateAddressDto, authUser: IUser): Promise<IAddress> {
    const exists = await this.addressExists({ label: data.label, user: authUser._id });
    if (exists) throw new ConflictException("address with label already exists.");

    return (await this.address.create(data)).toObject();
  }

  async addressExists(data: { label: string; user: string }): Promise<boolean> {
    const { label, user } = data;

    const exists = await this.address.findOne({ label, user });
    if (exists) return true;
    return false;
  }

  async getAddressByID(id: string): Promise<IAddress> {
    if (!id) throw new BadRequestException("id is required.");

    const address = await this.address.findById(id).lean(true);
    if (!address) throw new NotFoundException("address not found.");

    return address;
  }

  async searchAddresses(filter: SearchAddressDto): Promise<IPaginatedAddresses> {
    const matchFilter = {};
    const or = [];
    const and = [];

    if (Object.keys(filter).length) {
      if (filter.user) or.push({ user: filter.user });
      if (filter.recipientMobile) or.push({ recipientMobile: filter.recipientMobile });
      if (filter.label) and.push({ label: { $regex: ".*" + filter.label + ".*", $options: "i" } });
      if (filter.city) and.push({ mobile: { $regex: ".*" + filter.city + ".*", $options: "i" } });
    }

    if (or.length) matchFilter["$or"] = or;
    if (and.length) matchFilter["$and"] = and;

    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const skip = (page - 1) * limit;

    const addresses = (await this.address.aggregate([{ $match: matchFilter }, { ...addPagination(page, skip, limit) }])) as any;
    return addresses;
  }

  async updateAddress(data: UpdateAddressDto): Promise<IAddress> {
    const { id, ...updateData } = data;

    const address = await this.address.findByIdAndUpdate(id, updateData, { new: true }).lean(true);
    if (!address) throw new NotFoundException("address not found.");

    return address;
  }

  async deleteAddress(id: string): Promise<{ id: string }> {
    if (!id) throw new BadRequestException("id is required.");

    const address = await this.address.findByIdAndDelete(id).lean(true);
    if (!address) throw new NotFoundException("invalid id.");

    return { id };
  }
}
