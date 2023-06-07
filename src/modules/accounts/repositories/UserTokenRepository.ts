import { IAppDatasource } from "@shared/infra/typeorm/IAppDataSource";
import { inject, injectable } from "tsyringe";
import { Repository } from "typeorm";
import { UserToken } from "../infra/typeorm/entities/UserToken";
import { IUserTokenRepository } from "./IUserTokensRepository";

@injectable()
class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>;

  constructor(
    @inject("AppDatasource")
    private dataSource: IAppDatasource
  ) {
    this.repository = dataSource.get().getRepository(UserToken);
  }

  async create({ id, token, userId }: UserToken): Promise<UserToken> {
    return await this.repository.save({ id, token, userId });
  }

  async findByUserIdAndToken({
    userId,
    token,
  }: {
    userId: string;
    token: string;
  }): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      where: { userId, token },
    });
    return userToken;
  }

  async delete({
    token,
    userId,
  }: {
    token: string;
    userId: string;
  }): Promise<void> {
    await this.repository.delete({ token, userId });
  }
}
export { UserTokenRepository };
