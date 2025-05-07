/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Employees')
@Controller('employees')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() body: CreateUserDto) {
    console.log('reqreqrequser', req);
    if (!req.user.isAdmin) throw new ForbiddenException();
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    console.log('user', req);
    if (!req.user.isAdmin) throw new ForbiddenException();
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    if (req.user.isAdmin || req.user.userId === id) {
      return this.usersService.findOne(id);
    }
    throw new ForbiddenException();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    if (!req.user.isAdmin) throw new ForbiddenException();
    return this.usersService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    if (!req.user.isAdmin) throw new ForbiddenException();
    return this.usersService.remove(id);
  }

  @ApiOperation({ summary: 'Get leave info for an employee' })
  @UseGuards(JwtAuthGuard)
  @Get(':id/leave-info')
  async getLeaveInfo(@Request() req, @Param('id') id: string) {
    if (req.user.isAdmin || req.user.userId === id) {
      const employee = await this.usersService.findOne(id);
      if (employee) {
        const pendingLeaves = employee.totalLeaves - employee.availedLeaves;
        return {
          totalLeaves: employee.totalLeaves,
          availedLeaves: employee.availedLeaves,
          pendingLeaves,
        };
      }
    }
    throw new ForbiddenException();
  }
}
