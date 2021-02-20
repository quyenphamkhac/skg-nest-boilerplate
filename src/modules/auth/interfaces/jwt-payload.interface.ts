import { Role } from 'src/common/enums/role.enum';

export interface JwtPayload {
  username: string;
  role: Role;
  sub: number;
}
