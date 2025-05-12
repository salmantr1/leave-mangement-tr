import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { IsLessThanOrEqual } from '../validators/is-less-than-or-equal.validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;

  @ApiProperty({ required: false, default: 20 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Max(50)
  totalLeaves: number;

  @ApiProperty({ required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  @IsNumber()
  @IsLessThanOrEqual('totalLeaves', {
    message: 'Availed leaves cannot be greater than total leaves',
  })
  availedLeaves?: number;
}
