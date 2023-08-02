import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRoleDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  shortForm: string;

  @ApiPropertyOptional()
  @IsString()
  description: string;

  @ApiResponseProperty()
  createdBy: string;
}
