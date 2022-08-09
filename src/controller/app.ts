import { Controller, Get, Res } from "@nestjs/common";
import { AppService }                  from "@/service/app";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(@Res() res: any) {
    res.renderToString();
//    return this.appService.getHello();
  }
}
