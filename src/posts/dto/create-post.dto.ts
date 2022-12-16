/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({example: 'Feito em base do curso do professor aluízio', required: true})
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({example: 'Feito em base do curso do professor aluízio', required: false})
  @IsString()
  @IsOptional()
  content?: string;
  @ApiProperty({example: 'mateus.poletto@tecredi.com.br', required: true})
  @IsEmail()
  authorEmail: string;
}
