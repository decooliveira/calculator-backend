import { IBalanceRepository } from "./IBalanceRepository";
import { Repository } from "typeorm";
import { Balance } from "../infra/typeorm/entities/Balance";
import { IBalanceRequest } from "@shared/container/interfaces/IBalanceRequest";
import { inject, injectable } from "tsyringe";
import { IAppDatasource } from "@shared/infra/typeorm/IAppDataSource";

@injectable()
class BalanceRepository implements IBalanceRepository {
  private repository: Repository<Balance>;

  constructor(
    @inject("AppDatasource")
    private dataSource: IAppDatasource
  ) {
    this.repository = dataSource.get().getRepository(Balance);
  }

  async getBalance({ userId }: IBalanceRequest): Promise<Balance> {
    const balance = await this.repository.findOne({ where: { userId } });
    return balance;
  }

  async updateBalance({
    userId,
    type,
    value,
  }: IBalanceRequest): Promise<number> {
    value = type === "credit" ? Number(value) : -1 * Number(value);

    const balance = await this.getBalance({ userId });

    if (type === "credit" && value <= 0) {
      return Promise.resolve(balance.amount);
    } else if (type === "debit" && value > 0) {
      value = -1 * Number(value);
    }

    if (balance) {
      const newAmount = Number(balance.amount) + value;

      const result = await this.repository.save({
        ...balance,
        amount: newAmount ? newAmount : 0,
      });

      return result.amount;
    }

    return Promise.resolve(0);
  }

  async createBalance({ userId }: IBalanceRequest): Promise<void> {
    const balance = new Balance();
    balance.userId = userId;
    balance.amount = 100;
    await this.repository.save(balance);
    return Promise.resolve();
  }
}

export { BalanceRepository };
