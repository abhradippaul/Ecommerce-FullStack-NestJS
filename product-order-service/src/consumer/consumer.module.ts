import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  providers: [ConsumerService],
  imports: [DrizzleModule],
})
export class ConsumerModule {}
