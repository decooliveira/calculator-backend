import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IBalanceRepository } from "@modules/balance/repositories/IBalanceRepository";
import { IBalanceRequest } from "@shared/container/interfaces/IBalanceRequest";

@injectable()
class CreateInitialBalanceUseCase {
  constructor(
    @inject("BalanceRepository")
    private balanceRepository: IBalanceRepository
  ) {}

  async execute({ userId }: IBalanceRequest): Promise<void> {
    const params: IBalanceRequest = {
      userId,
    };
    await this.balanceRepository.createBalance(params);
    return Promise.resolve();
  }
}
export { CreateInitialBalanceUseCase };
