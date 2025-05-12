// src/leave/leave.controller.ts
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { CreateMultipleLeavesDto } from './dtos/create-multiple-leaves.dto';
import { Leave } from './schemas/leave.schema';

@ApiTags('Leaves')
@Controller('leaves')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get all leaves for a user' })
  findByUser(@Param('userId') userId: string) {
    return this.leaveService.findByUser(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Add multiple leaves for one employee' })
  createMultipleLeaves(@Body() dto: CreateMultipleLeavesDto) {
    return this.leaveService.createMultipleLeavesForEmployee(dto);
  }

  @Get('/employee/:id')
  @ApiOkResponse({ type: [Leave] })
  async getLeavesByEmployee(@Param('id') id: string) {
    return this.leaveService.getLeavesByEmployee(id);
  }

  @Delete(':leaveId')
  @ApiOperation({ summary: 'Delete a leave by its ID' })
  async deleteLeave(@Param('leaveId') leaveId: string) {
    return this.leaveService.deleteLeaveById(leaveId);
  }
}
