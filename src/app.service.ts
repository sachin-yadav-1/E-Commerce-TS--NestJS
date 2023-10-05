import { Injectable } from "@nestjs/common";
import { FileUploadService } from "./common/services/file-upload.service";

@Injectable()
export class AppService {
  constructor(private readonly fileUpload: FileUploadService) {}

  getStatus(): { status: string; message: string } {
    return { status: "OK", message: "Service is up and running." };
  }

  async uploadFile(data: any): Promise<any> {
    return await this.fileUpload.getPreSignedUrl(data);
  }
}
