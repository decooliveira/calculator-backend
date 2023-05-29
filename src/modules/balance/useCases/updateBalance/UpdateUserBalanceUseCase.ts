import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IBalanceRepository } from "@modules/balance/repositories/IBalanceRepository";
import { IBalanceRequest } from "@shared/container/interfaces/IBalanceRequest";

@injectable()
class UpdateUserBalanceUseCase {
  constructor(
    @inject("BalanceRepository")
    private balanceRepository: IBalanceRepository
  ) {}

  async execute({ userId, type, value }: IBalanceRequest): Promise<number> {
    const params: IBalanceRequest = {
      userId,
      type,
      value,
    };
    return await this.balanceRepository.updateBalance(params);
  }
}
export { UpdateUserBalanceUseCase };
