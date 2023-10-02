import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import mongoConfig from "./config/mongoConfig";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".dev.env",
      cache: true,
      isGlobal: true,
      load: [mongoConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get("mongoConfig"),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
