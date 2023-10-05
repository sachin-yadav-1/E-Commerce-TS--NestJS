import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus(): { status: string; message: string } {
    return this.appService.getStatus();
  }

  @Post("upload")
  async uploadFile(@Body() data: any): Promise<any> {
    return await this.appService.uploadFile(data);
  }
}
