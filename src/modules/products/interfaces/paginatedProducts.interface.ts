import { IPaginateData } from "../../../common/interfaces/paginateData.interface";
import { IProduct } from "./product.interface";

export interface IPaginatedProducts extends IPaginateData {
  data: IProduct[];
}
