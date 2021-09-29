import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async createOrder(@Body() payload: CreateUserDto): Promise<User> {
    return this.userService.createUser(payload);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, payload);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async putById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return this.userService.putUser(id, payload);
  }
}
