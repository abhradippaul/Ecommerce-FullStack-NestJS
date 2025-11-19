import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [ProductsController],
  imports: [DrizzleModule],
  providers: [ProductsService],
})
export class ProductsModule {}
