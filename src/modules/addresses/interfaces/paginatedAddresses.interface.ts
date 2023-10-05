import { IPaginateData } from "../../../common/interfaces/paginateData.interface";
import { IAddress } from "./address.interface";

export interface IPaginatedAddresses extends IPaginateData {
  data: IAddress[];
}
