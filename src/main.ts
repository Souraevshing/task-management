import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  // creating Logger object to log info
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  // enable validation at app level (globally)
  app.useGlobalPipes(new ValidationPipe());

  // enable interceptor at app level (globally) to
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(PORT);

  logger.log(`Server running on port ${PORT}`);
}
bootstrap();
