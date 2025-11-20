import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ConsumerService } from './consumer/consumer.service';
import { ProducerModule } from './producer/producer.module';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ProducerModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConsumerService, SeedService],
})
export class AppModule {}
