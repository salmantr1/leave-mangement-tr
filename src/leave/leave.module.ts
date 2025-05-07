// src/leave/leave.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Leave, LeaveSchema } from './schemas/leave.schema';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Leave.name, schema: LeaveSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
