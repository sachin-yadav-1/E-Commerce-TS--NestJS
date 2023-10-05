import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import { generateFileName } from "../../helpers/stringHelpers";

@Injectable()
export class FileUploadService {
  private readonly bucketName = process.env.AWS_BUCKET_KEY;

  constructor(private readonly configService: ConfigService) {}

  private async s3Client() {
    const config = this.configService.get<S3.ClientConfiguration>("s3Config");
    console.log("S3 Options: ", config);
    return new S3(config);
  }

  async getPreSignedUrl(type: string, ext: string = null): Promise<any> {
    const fileName = generateFileName(ext);

    // prettier-ignore
    const url = await (await this.s3Client()).getSignedUrlPromise("putObject", {
      Bucket: this.bucketName,
      ContentType: type,
      Key: fileName,
    });

    return { key: fileName, url };
  }
}
