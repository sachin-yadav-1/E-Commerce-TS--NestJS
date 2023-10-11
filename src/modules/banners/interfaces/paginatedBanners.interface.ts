import { IPaginateData } from "../../../common/interfaces/paginateData.interface";
import { IBanner } from "./banner.interface";

export interface IPaginatedBanners extends IPaginateData {
  data: IBanner[];
}
