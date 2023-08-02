import { ApiResponseProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiResponseProperty()
  access_token: string;
}
