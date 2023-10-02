import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import jwtConfig from "./config/jwtConfig";
import mongoConfig from "./config/mongoConfig";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".dev.env",
      cache: true,
      isGlobal: true,
      load: [mongoConfig, jwtConfig],
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
