import { IPaginateData } from "../../../common/interfaces/paginateData.interface";
import { ICategory } from "./category.interface";

export interface IPaginatedCategories extends IPaginateData {
  data: ICategory[];
}
