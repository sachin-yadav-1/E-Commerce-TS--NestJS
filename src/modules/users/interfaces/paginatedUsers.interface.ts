import { IPaginateData } from "../../../common/interfaces/paginateData.interface";
import IUser from "./user.interface";

export interface IPaginatedUsers extends IPaginateData {
  data: IUser[];
}
