import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
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
import { Pagination } from 'src/common/decorators/panigated-options.decorator';
import { PaginationDto, PaginationOptions } from 'src/shared/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(
    @Pagination() paginationOptions: PaginationOptions,
  ): Promise<PaginationDto<User>> {
    return this.userService.findAll(paginationOptions);
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

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
    return this.userService.updateUserById(id, payload);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async putById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return this.userService.putUserById(id, payload);
  }

  @Delete('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.deleteUserById(id);
  }
}
