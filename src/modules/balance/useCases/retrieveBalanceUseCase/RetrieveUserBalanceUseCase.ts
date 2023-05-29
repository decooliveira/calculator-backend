import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IBalanceRepository } from "@modules/balance/repositories/IBalanceRepository";
import { IBalanceRequest } from "@shared/container/interfaces/IBalanceRequest";
import { BalanceMapper } from "@modules/balance/mapper/BalanceMapper";
import { BalanceDTO } from "@modules/balance/dtos/BalanceDTO";

@injectable()
class RetrieveUserBalanceUseCase {
  constructor(
    @inject("BalanceRepository")
    private balanceRepository: IBalanceRepository
  ) {}

  async execute({ userId }: IBalanceRequest): Promise<BalanceDTO> {
    const params: IBalanceRequest = {
      userId,
    };
    return BalanceMapper.toDTO(await this.balanceRepository.getBalance(params));
  }
}
export { RetrieveUserBalanceUseCase };
