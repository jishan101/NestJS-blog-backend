import { ApiResponseProperty } from '@nestjs/swagger';

export class RoleResponseDTO {
  @ApiResponseProperty()
  _id: string;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  shortForm: string;

  @ApiResponseProperty()
  description: string;

  @ApiResponseProperty()
  createdBy: string;

  @ApiResponseProperty()
  createdAt: string;

  @ApiResponseProperty()
  updatedBy: string;

  @ApiResponseProperty()
  updatedAt: string;

  @ApiResponseProperty()
  isActive: boolean;

  @ApiResponseProperty()
  __v: number;
}
