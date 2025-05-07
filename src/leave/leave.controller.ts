// src/leave/leave.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateMultipleLeavesDto } from './dtos/create-multiple-leaves.dto';

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
}
