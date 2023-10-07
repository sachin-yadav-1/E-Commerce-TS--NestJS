import { ClientConfiguration } from "aws-sdk/clients/s3";

export default (): ClientConfiguration => ({
  apiVersion: "2010-12-01",
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
});
