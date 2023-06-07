import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  userId: string;
  token: string;
}

@injectable()
class ValidateExistingTokenUseCase {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository
  ) {}

  async execute({ userId, token }: IRequest): Promise<UserToken> {
    const foundToken: UserToken =
      await this.userTokenRepository.findByUserIdAndToken({ userId, token });
    return foundToken;
  }
}

export { ValidateExistingTokenUseCase };
