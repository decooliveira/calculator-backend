import { IBalanceRequest } from "@shared/container/interfaces/IBalanceRequest";
import { Balance } from "../infra/typeorm/entities/Balance";

interface IBalanceRepository {
  createBalance({ userId }: IBalanceRequest): Promise<void>;
  getBalance({ userId }: IBalanceRequest): Promise<Balance>;
  updateBalance(params: IBalanceRequest): Promise<number>;
}

export { IBalanceRepository };
