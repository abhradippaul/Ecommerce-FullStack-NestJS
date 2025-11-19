import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  const seedService = app.get(SeedService);
  await seedService.seed();
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
