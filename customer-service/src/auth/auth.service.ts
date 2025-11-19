import {
  Body,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { LoginDto } from './dto/login.dto';
import { and, eq } from 'drizzle-orm';
import type { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

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

      console.log(customer);

      if (!customer.length) {
        throw new NotFoundException('Customer not found');
      }

      const customerToken = customer[0].id;
      const cookieName = 'customer-token';
      const oneDay = 24 * 60 * 60 * 1000;

      response.cookie(cookieName, customerToken, {
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
}
