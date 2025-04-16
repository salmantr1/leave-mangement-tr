import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async createAdmin() {
    const existingAdmin = await this.userModel.findOne({
      email: 'admin1@example.com',
    });
    if (!existingAdmin) {
      //   const hashedPassword = await bcrypt.hash('admin123', 10);
      const hash = await bcrypt.hash('admin124', 10);
      await this.userModel.create({
        email: 'admin1@example.com',
        password: hash,
        isAdmin: true,
      });
      console.log('✅ Admin user created: admin@example.com / admin123');
    }
  }

  // Add below existing methods

  async create(data: any) {
    return this.userModel.create(data);
  }

  async findAll() {
    return this.userModel.find().select('-password');
  }

  async findOne(id: string) {
    return this.userModel.findById(id).select('-password');
  }

  async update(id: string, data: any) {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
