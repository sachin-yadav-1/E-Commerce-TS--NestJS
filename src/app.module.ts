import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { MongooseModule } from "@nestjs/mongoose";
import * as cookieParser from "cookie-parser";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FileUploadService } from "./common/services/file-upload.service";
import jwtConfig from "./config/jwt.config";
import mongoConfig from "./config/mongo.config";
import s3Config from "./config/s3.config";
import { AddressesModule } from "./modules/addresses/addresses.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CartsModule } from "./modules/carts/carts.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { ProductsModule } from "./modules/products/products.module";
import { UsersModule } from "./modules/users/users.module";
import { BannersModule } from './modules/banners/banners.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      cache: true,
      isGlobal: true,
      load: [mongoConfig, jwtConfig, s3Config],
    }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get("mongoConfig"),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    AddressesModule,
    CategoriesModule,
    ProductsModule,
    CartsModule,
    BannersModule,
    ReviewsModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes("*");
  }
}
