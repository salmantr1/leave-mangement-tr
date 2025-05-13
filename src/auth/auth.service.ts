/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { ENV } from 'src/config/env';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    console.log('in function validateUser user', user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // const isMatch = pass === user.password;
    const isMatch = await bcrypt.compare(pass, user.password);
    console.log(
      'in function validateUser user ismatch',
      isMatch,
      pass,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...result } = user.toObject();
    return result;
  }

  async login(user: any) {
    console.log('user', user);

    const expiry = `${ENV.JWT_TOKEN_EXPIRATION_IN_HOURS}h`;

    const payload = { sub: user._id, email: user.email, isAdmin: user.isAdmin };
    const access_token = this.jwtService.sign(payload, {
      secret: `${ENV.JWT_SECRET}`,
      expiresIn: expiry,
    });

    return {
      access_token,
      user: {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    console.log('userpassss', user, oldPassword, newPassword);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return { message: 'Password updated successfully' };
  }
}
