import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  userId: string;
  token: string;
}

@injectable()
class LogoutUseCase {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository
  ) {}

  async execute({ userId, token }: IRequest): Promise<void> {
    await this.userTokenRepository.delete({ userId, token });
  }
}

export { LogoutUseCase };
