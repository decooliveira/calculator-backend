import { BalanceDTO } from "../dtos/BalanceDTO";
import { Balance } from "../infra/typeorm/entities/Balance";

class BalanceMapper {
  static toDTO({ amount }: Balance): BalanceDTO {
    const balance = { amount };
    return balance;
  }
}

export { BalanceMapper };
