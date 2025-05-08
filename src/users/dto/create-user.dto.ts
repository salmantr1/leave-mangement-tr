import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;

  @ApiProperty({ default: 20 })
  @IsNumber()
  @IsOptional()
  totalLeaves?: number;

  @ApiProperty({ default: 0 })
  @IsNumber()
  @IsOptional()
  availedLeaves?: number;
}
