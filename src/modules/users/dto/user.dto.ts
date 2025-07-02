import { Role } from '../enum/role.enum';

export interface IndexUserDTO {
  id: number;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}
