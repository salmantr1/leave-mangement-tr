import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ default: false })
  isAdmin: boolean;

  @ApiProperty({ default: 20 })
  totalLeaves: number;

  @ApiProperty({ default: 0 })
  availedLeaves: number;
}
