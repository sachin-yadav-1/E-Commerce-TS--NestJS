import { ConfigModule } from "@nestjs/config";
import { MongooseModule, getConnectionToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Connection } from "mongoose";
import mongoConfig from "../../config/mongo.config";
import UserSchema from "./schema/user.schema";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;
  let mongooseConnection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ".dev.env",
          cache: true,
          isGlobal: true,
          load: [mongoConfig],
        }),
        MongooseModule.forRoot(process.env.DB_URI),
        MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mongooseConnection = module.get<Connection>(getConnectionToken());
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await mongooseConnection.close();
  });
});
