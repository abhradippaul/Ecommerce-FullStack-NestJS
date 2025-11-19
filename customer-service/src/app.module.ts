import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
