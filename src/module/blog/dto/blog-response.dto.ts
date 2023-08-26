import { ApiResponseProperty } from '@nestjs/swagger';

export class BlogResponseDTO {
  @ApiResponseProperty()
  _id: string;

  @ApiResponseProperty()
  title: string;

  @ApiResponseProperty()
  content: string;

  @ApiResponseProperty()
  imageUrl: string;

  @ApiResponseProperty()
  categories: string[];

  @ApiResponseProperty()
  author: string;

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
