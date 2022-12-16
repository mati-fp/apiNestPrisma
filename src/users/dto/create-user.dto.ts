/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({example: 'matipoletto@hotmail.com', required: true})
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({example: 'Ronalidinho Gaúcho', required: true})
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({example: 'true', required: false})
  @IsBoolean()
  admin: boolean;
}
