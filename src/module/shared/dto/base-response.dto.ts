import { ApiResponseProperty } from '@nestjs/swagger';

export class BaseResponseDTO {
  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  createdBy: string;

  @ApiResponseProperty()
  updatedAt: Date;

  @ApiResponseProperty()
  updatedBy: string;

  @ApiResponseProperty()
  isActive: boolean;
}
