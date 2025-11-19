import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    DrizzleModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
