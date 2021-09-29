import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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
