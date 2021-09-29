import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user-dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { id, name, createdAt, updatedAt } = createUserDto;
    const user = this.create({
      id,
      name,
      createdAt,
      updatedAt,
    });
    await user.save();
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} is not found.`);
    }
    const { name, createdAt, updatedAt } = updateUserDto;
    if (name) user.name = name;
    if (createdAt) user.createdAt = createdAt;
    if (updatedAt) user.updatedAt = updatedAt;
    await user.save();
    return user;
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = new User();
    const salt = await bcrypt.genSalt();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);
    try {
      await user.save();
    } catch (error) {}
  }
  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }
  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
