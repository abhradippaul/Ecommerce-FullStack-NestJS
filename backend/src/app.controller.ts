import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @HttpCode(200)
  @Get('hello')
  myHello(): string {
    return 'My custome hello';
  }

  @HttpCode(200)
  @Get('api')
  apiHello(): string {
    return 'Response from apihello';
  }
}
