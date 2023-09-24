import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { validationSchema } from 'config.schema';
import { Swagger } from './swagger-config/swagger-config.module';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerService } from './swagger-config/swagger-config.service';

// passing orm metadata at root level to use db to perform CRUD operations
// configuring env variables STAGE DEV QA for file .env.${ENV_VARIABLE}
// load env variable and set metadata for db using ConfigService.get() to set from .env.stage.${filename} file
@Module({
  imports: [
    Swagger,
    AuthModule,
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.getOrThrow('DB_HOST'),
          port: configService.getOrThrow('DB_PORT'),
          username: configService.getOrThrow('DB_USERNAME'),
          password: configService.getOrThrow('DB_PASSWORD'),
          database: configService.getOrThrow('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
  providers:[SwaggerService]
})
export class AppModule {}
