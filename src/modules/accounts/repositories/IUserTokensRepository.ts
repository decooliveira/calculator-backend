import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUserTokenRepository {
  create({ token, userId }: ICreateUserTokenDTO): Promise<UserToken>;

  findByUserIdAndToken({
    userId,
    token,
  }: {
    userId: string;
    token: string;
  }): Promise<UserToken>;

  delete({ token, userId }: { token: string; userId: string }): Promise<void>;
}

export { IUserTokenRepository };
