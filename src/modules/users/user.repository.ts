import { DataSource, IsNull, Repository } from 'typeorm';
import { User } from './user.entity';

export default class UserRepository {
  private readonly repository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
      order: { createdAt: 'ASC' },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({
      where: { id, deletedAt: IsNull() },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email, deletedAt: IsNull() },
    });
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
