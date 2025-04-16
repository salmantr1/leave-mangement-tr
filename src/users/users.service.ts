import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async createAdmin() {
    const existingAdmin = await this.userModel.findOne({
      email: 'admin@example.com',
    });
    if (!existingAdmin) {
      //   const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.userModel.create({
        email: 'admin@example.com',
        password: 'admin123',
        isAdmin: true,
      });
      console.log('✅ Admin user created: admin@example.com / admin123');
    }
  }
}
