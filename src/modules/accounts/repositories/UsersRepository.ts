import { Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "../infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";
import { IAppDatasource } from "@shared/infra/typeorm/IAppDataSource";

@injectable()
class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor(
    @inject("AppDatasource")
    private dataSource: IAppDatasource
  ) {
    this.repository = dataSource.get().getRepository(User);
  }

  async create({
    username,
    password,
    status,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      username,
      password,
      status,
      id,
    });

    await this.repository.save(user);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repository.findOne({ where: { username } });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    return user;
  }
}

export { UsersRepository };
