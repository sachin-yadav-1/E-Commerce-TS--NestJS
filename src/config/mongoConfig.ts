import { MongooseModuleOptions } from "@nestjs/mongoose";

export default (): {
  mongoConfig: MongooseModuleOptions;
} => ({
  mongoConfig: {
    uri: process.env.DB_URI,
  },
});
