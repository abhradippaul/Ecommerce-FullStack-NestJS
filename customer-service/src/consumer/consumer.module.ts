import { Module } from '@nestjs/common';
import { ProducerModule } from 'src/producer/producer.module';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [ProducerModule],
  providers: [ConsumerService],
})
export class ConsumerModule {}
