import "reflect-metadata";
import { hash } from "bcrypt";
import { container, inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateInitialBalanceUseCase } from "@modules/balance/useCases/createInitialBalanceUseCase/CreateInitialBalanceUseCase";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ username, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByUsername(
      username
    );

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      username,
      password: passwordHash,
      status: "active",
    });

    const user = await this.usersRepository.findByUsername(username);
    const createInitialBalanceUseCase = container.resolve(
      CreateInitialBalanceUseCase
    );
    createInitialBalanceUseCase.execute({ userId: user.id });
  }
}

export { CreateUserUseCase };
