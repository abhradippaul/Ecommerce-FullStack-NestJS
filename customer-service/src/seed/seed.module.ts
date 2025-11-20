import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { SeedService } from './seed.service';

@Module({
  imports: [DrizzleModule],
  providers: [SeedService],
})
export class SeedModule {}
