import { Module } from "@nestjs/common";
import { AddressesService } from "./addresses.service";
import { AddressesController } from "./addresses.controller";
import { MongooseModule } from "@nestjs/mongoose";
import AddressSchema from "./schema/address.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Address", schema: AddressSchema }])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
