import {
  Body,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Req,
  Res,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { LoginDto } from './dto/login.dto';
import { and, eq } from 'drizzle-orm';
import type { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET') ?? '';
  }

  async verifyUser(@Req() request: Request) {
    try {
      const jwtToken = request.cookies['customer-token'];

      if (!jwtToken) {
        return {
          isLoggedIn: false,
          message: 'Token not found',
          status: 404,
        };
      }

      const { userId } = await this.jwtService.verify(jwtToken, {
        secret: this.jwtSecret,
      });

      if (!userId) {
        return {
          isLoggedIn: false,
          message: 'User id not found',
          status: 404,
        };
      }

      return {
        isLoggedIn: true,
        message: 'User is verified',
        status: 200,
      };
    } catch (err) {
      console.log(err);
      return {
        isLoggedIn: false,
        message: 'An unexpected error occurred during user verification.',
        status: 500,
      };
    }
  }

  async loginUser(@Body() LoginDto: LoginDto, @Res() response: Response) {
    try {
      const { email, password } = LoginDto;

      const customer = await this.db
        .select()
        .from(schema.customers)
        .where(
          and(
            eq(schema.customers.email, email),
            eq(schema.customers.password, password),
          ),
        );

      if (!customer.length) {
        return {
          message: 'Customer not found',
          status: 404,
        };
      }

      const customerId = customer[0].id;
      const cookieName = 'customer-token';
      const oneDay = 24 * 60 * 60 * 1000;

      const payload = { userId: customerId };
      const token = await this.jwtService.signAsync(payload, {
        secret: this.jwtSecret,
      });

      response.cookie(cookieName, token, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + oneDay),
        sameSite: 'none',
        path: '/',
      });

      return {
        message: 'Login successfully',
        cookieToken: token,
        status: 200,
      };
    } catch (err) {
      console.log(err);
      return {
        message: 'Internal server error',
        status: 500,
      };
    }
  }

  async logoutUser(@Res() response: Response) {
    response.clearCookie('customer-token');
    return response.json({
      message: 'Logout successful',
    });
  }
}
