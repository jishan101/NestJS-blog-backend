import { ApiResponseProperty } from '@nestjs/swagger';

export class UserResponseDTO {
  @ApiResponseProperty()
  _id: string;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  username: string;

  @ApiResponseProperty()
  firstName: string;

  @ApiResponseProperty()
  lastName: string;

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
  __v: boolean;
}
