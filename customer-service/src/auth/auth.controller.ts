import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get('/verify')
  verifyUser(@Req() req: Request) {
    return this.appService.verifyUser(req);
  }

  @Post('/login')
  loginUser(
    @Body() LoginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.appService.loginUser(LoginDto, response);
  }

  @Post('/logout')
  logoutUser(@Res() response: Response) {
    return this.appService.logoutUser(response);
  }

  @Get('/customer-info')
  customerInfo(@Req() req: Request) {
    return this.appService.customerInfo(req);
  }
}
