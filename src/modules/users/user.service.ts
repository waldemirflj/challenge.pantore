import { User } from './user.entity';
import UserRepository from './user.repository';
import { BadRequestError, NotFoundError } from '../../errors';
import { encryptPassword } from '../../common/encrypt';
import { IndexUserDTO, CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { Role } from './enum/role.enum';

export default class UserService {
  constructor(private readonly repository: UserRepository) {}

  async show(): Promise<User[]> {
    return this.repository.findAll();
  }

  async index(data: IndexUserDTO): Promise<User | Error> {
    const user = await this.repository.findById(data.id);

    if (!user) {
      throw new NotFoundError('Usuário não cadastrado');
    }

    return user;
  }

  async create(data: CreateUserDTO): Promise<User | Error> {
    const email = await this.repository.findByEmail(data.email);

    if (email) {
      throw new BadRequestError('E-mail já cadastrado');
    }

    const isValidRole = data.role ? Object.values(Role).includes(data.role) : null;

    if (!isValidRole) {
      throw new BadRequestError('Função (role) inválida');
    }

    const password = await encryptPassword(data.password);

    return this.repository.create({ ...data, password });
  }

  async update(id: number, data: UpdateUserDTO): Promise<User | Error> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('Usuário não cadastrado');
    }

    if (data.password) {
      const password = await encryptPassword(data.password);
      data.password = password;
    }

    Object.assign(user, data);
    return this.repository.create(user);
  }

  async delete(id: number): Promise<void | Error> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError('Usuário não cadastrado');
    }

    return this.repository.softDelete(id);
  }

  async encryptPassword(password: string): Promise<string> {
    return encryptPassword(password);
  }
}
