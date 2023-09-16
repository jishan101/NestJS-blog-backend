import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { BlogResponseDTO } from './blog-response.dto';

export class BlogWithTotalResponseDTO {
  @ApiResponseProperty()
  total: number;

  @ApiProperty({ type: BlogResponseDTO, isArray: true })
  @Type(() => BlogResponseDTO)
  @IsArray()
  @ValidateNested()
  blogs: BlogResponseDTO[];
}
