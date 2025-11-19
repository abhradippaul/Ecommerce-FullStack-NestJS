import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [DataController],
  imports: [DrizzleModule],
  providers: [DataService],
})
export class DataModule {}
