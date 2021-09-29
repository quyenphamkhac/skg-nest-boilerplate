import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { PutUserDto } from './dto/put-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { PaginationDto, PaginationOptions } from 'src/shared/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async findAll(
    paginationOptions: PaginationOptions,
  ): Promise<PaginationDto<User>> {
    const { limit, offset } = paginationOptions;
    const where = {};
    const [users, total] = await this.userRepository.findAndCount({
      where,
      take: limit,
      skip: offset,
    });
    return {
      items: users,
      total,
      limit,
      offset,
    };
  }

  async findUserById(id: string): Promise<User> {
    const found = await this.userRepository.findOne(id);
    if (!found) throw new NotFoundException(`User with id ${id} is not found.`);
    return found;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { id } = createUserDto;
    const found = await this.userRepository.findOne(id);
    if (found) {
      throw new ConflictException(`User with id ${id} is existed.`);
    }
    return this.userRepository.createUser(createUserDto);
  }

  async updateUserById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (id !== updateUserDto.id) {
      throw new BadRequestException(
        `Param id ${id} and payload id ${updateUserDto.id} must be the same.`,
      );
    }
    return this.userRepository.updateUser(id, updateUserDto);
  }

  async putUserById(id: string, putUserDto: PutUserDto): Promise<User> {
    if (id !== putUserDto.id) {
      throw new BadRequestException(
        `Param id ${id} and payload id ${putUserDto.id} must be the same.`,
      );
    }
    const found = await this.userRepository.findOne(id);
    if (found) return this.userRepository.updateUser(id, putUserDto);
    else return this.userRepository.createUser(putUserDto);
  }

  async deleteUserById(id: string): Promise<User> {
    const found = await this.userRepository.findOne(id);
    if (!found) throw new NotFoundException(`User with id ${id} is not found.`);
    await this.userRepository.delete(id);
    return found;
  }
}
