/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Param, Patch } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    console.log('validated usersssssss', user);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout() {
    return { message: 'Logged out successfully' };
  }

  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized or invalid old password',
  })
  // @UseGuards(JwtAuthGuard)
  @Patch('change-password/:id')
  async changePassword(
    @Param('id') userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    console.log('userId', userId);
    return this.authService.changePassword(
      userId,
      dto.oldPassword,
      dto.newPassword,
    );
  }
}
