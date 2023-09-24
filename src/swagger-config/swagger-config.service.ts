import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
  constructor(private readonly configService: ConfigService) {}

  createDocument(app: any): void {
    const options = new DocumentBuilder()
      .setTitle('Task Management')
      .setDescription('RestAPI using Nest.js')
      .setVersion('1.0.0')
      .setContact(
        'Sourav Kumar',
        'https://sauraevshing-portfolio.netlify.app/',
        'isauravshing@gmail.com',
      )
      .addBearerAuth()
      .addTag('Users', 'Endpoints related to Users')
      .addTag('Tasks', 'Endpoints related to Tasks')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api.dev.task-management', app, document);
  }
}
