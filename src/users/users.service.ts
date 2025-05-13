/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return this.userModel.findOne({ _id: id });
  }
  async getUserInfo(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createAdmin() {
    const existingAdmin = await this.userModel.findOne({
      email: 'abakkar@technologyrivers.com',
    });
    if (!existingAdmin) {
      //   const hashedPassword = await bcrypt.hash('admin123', 10);
      const hash = await bcrypt.hash('Tr@123456', 10);
      await this.userModel.create({
        email: 'abakkar@technologyrivers.com',
        name: 'admin',
        password: hash,
        isAdmin: true,
      });
    }
  }

  // Add below existing methods

  async create(data: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const password = data?.password || 'Tr@123456';
    const hash = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      email: data.email,
      name: data.name,
      password: hash,
      isAdmin: data.isAdmin,
      totalLeaves: data.totalLeaves,
      availedLeaves: data.availedLeaves,
    });
    return newUser;
  }

  async findAll() {
    return this.userModel.find().select('-password');
  }

  async findOne(id: string) {
    return this.userModel.findById(id).select('-password');
  }

  async update(id: string, data: any) {
    console.log('datadatadatadata', data);
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
