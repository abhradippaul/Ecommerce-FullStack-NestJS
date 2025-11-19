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
        throw new NotFoundException('Token not found');
      }

      const { userId } = await this.jwtService.verify(jwtToken, {
        secret: this.jwtSecret,
      });

      if (!userId) {
        throw new NotFoundException('User id not found');
      }

      return {
        isLoggedIn: true,
        msg: 'User is verified',
      };
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred during user verification.',
      );
    }
  }

  async loginUser(
    @Body() LoginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
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
        throw new NotFoundException('Customer not found');
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
        expires: new Date(Date.now() + oneDay),
        sameSite: 'strict',
        path: '/',
      });

      return { msg: 'Login successful' };
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred during login.',
      );
    }
  }

  async logoutUser(@Res() response: Response) {
    response.clearCookie('customer-token');
    return response.json({
      msg: 'Logout successful',
    });
  }
}
