import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  description: string;
}
