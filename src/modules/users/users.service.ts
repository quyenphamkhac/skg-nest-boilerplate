import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { id } = createUserDto;
    const found = await this.userRepository.findOne(id);
    if (found) {
      throw new ConflictException(`User with id ${id} is existed.`);
    }
    return this.userRepository.createUser(createUserDto);
  }
}
