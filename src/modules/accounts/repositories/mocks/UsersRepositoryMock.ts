import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepositoryMock implements IUsersRepository {
  create(data: ICreateUserDTO): Promise<void> {
    return Promise.resolve();
  }
  findByUsername(username: string): Promise<User> {
    return Promise.resolve(new User());
  }
  findById(id: string): Promise<User> {
    const user: User = {
      id: "0fe35989-b43e-412d-8abd-befaa44844f7",
      username: "user@user.com",
      password: "user-password",
      status: "active",
      createdAt: new Date(),
    };
    return Promise.resolve(user);
  }
}

export { UsersRepositoryMock };
