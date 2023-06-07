import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: {
    username: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository
  ) {}

  async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUsername(username);

    const { expires_in_token, secret_token } = auth;

    if (!user) {
      throw new AppError("Username or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Username or password incorrect!");
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const userToken = new UserToken();
    userToken.token = token;
    userToken.userId = user.id;
    await this.userTokenRepository.create(userToken);

    const tokenReturn: IResponse = {
      user: {
        username: user.username,
      },
      token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
