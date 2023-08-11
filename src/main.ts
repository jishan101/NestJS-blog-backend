import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const CSS_URL =
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';

  const logger = new Logger('NestJS Blog Backend');

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());

  const config = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');

  app.enableShutdownHooks();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS Blog Backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, { customCssUrl: CSS_URL });

  const port = config.get('PORT', 4000);

  await app.listen(port, () =>
    logger.log(`Application listening on port: ${port}`),
  );
}
bootstrap();
