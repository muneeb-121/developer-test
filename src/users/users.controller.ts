import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.create(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const response = await this.usersService.findOne(id);
    if (!response) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `user with id: ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return response;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    const response = await this.usersService.update(id, user);
    if (!response) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `user with id: ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    const response = await this.usersService.remove(id);
    if (!response) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `user with id: ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return response;
  }
}
