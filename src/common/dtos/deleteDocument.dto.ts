import { Expose, Type } from "class-transformer";

export class DeleteDocumentDto {
  @Expose()
  @Type(() => String)
  id: string;
}
