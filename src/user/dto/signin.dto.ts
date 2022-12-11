import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SigninDto {

  @ApiProperty({
    description: 'username required for signin',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'password required for signin',
  })
  @IsString()
  password: string;
}
