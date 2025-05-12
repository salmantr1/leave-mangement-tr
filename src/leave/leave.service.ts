// src/leave/leave.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Leave } from './schemas/leave.schema';
import { Model } from 'mongoose';
import { CreateMultipleLeavesDto } from './dtos/create-multiple-leaves.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class LeaveService {
  constructor(
    @InjectModel(Leave.name) private leaveModel: Model<Leave>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // src/leave/leave.service.ts

  async createMultipleLeavesForEmployee(dto: CreateMultipleLeavesDto) {
    const { employee, leaves } = dto;

    // Validate employee exists
    const user = await this.userModel.findById(employee);
    if (!user) throw new NotFoundException('Employee not found');

    // Prepare leave entries with employee ID
    const leaveEntries = leaves.map((leave) => ({
      ...leave,
      employee,
    }));

    const saved = await this.leaveModel.insertMany(leaveEntries);

    // Update user's availed leaves count
    await this.userModel.findByIdAndUpdate(employee, {
      $inc: { availedLeaves: leaveEntries.length },
    });

    return saved;
  }

  // src/leave/leave.service.ts

  async findByUser(userId: string) {
    return this.leaveModel.find({ employee: userId }).sort({ date: -1 });
  }

  async getLeavesByEmployee(employeeId: string): Promise<Leave[]> {
    return this.leaveModel.find({ employee: employeeId }).exec();
  }

  async deleteLeaveById(leaveId: string): Promise<{ message: string }> {
    const leave = await this.leaveModel.findById(leaveId);
    if (!leave) {
      throw new NotFoundException('Leave not found');
    }

    await this.leaveModel.findByIdAndDelete(leaveId);

    // Decrease the availedLeaves of the associated employee
    await this.userModel.findByIdAndUpdate(leave.employee, {
      $inc: { availedLeaves: -1 },
    });

    return { message: 'Leave deleted successfully' };
  }
}
