import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import jwtConfig from "./config/jwtConfig";
import mongoConfig from "./config/mongoConfig";
import { AddressesModule } from "./modules/addresses/addresses.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import s3Config from "./config/s3Config";
import { FileUploadService } from "./common/services/file-upload.service";
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      cache: true,
      isGlobal: true,
      load: [mongoConfig, jwtConfig, s3Config],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get("mongoConfig"),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    AddressesModule,
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    FileUploadService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, transform: true }),
    },
  ],
})
export class AppModule {}
