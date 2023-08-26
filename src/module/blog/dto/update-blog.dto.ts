import { ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateBlogDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  categories: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiResponseProperty()
  updatedBy: string;
}
