import {
  ApiProperty,
  ApiPropertyOptional,
  ApiResponseProperty,
} from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateBlogDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  imageUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  categories: string[];

  @ApiResponseProperty()
  author: string;

  @ApiResponseProperty()
  createdBy: string;
}
