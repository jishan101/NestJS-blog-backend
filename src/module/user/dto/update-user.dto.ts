import { ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @ValidateIf((x) => x.newPassword)
  oldPassword: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  newPassword: string;

  @ApiResponseProperty()
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  birthDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  roleId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isApproved: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiResponseProperty()
  updatedBy: string;
}
