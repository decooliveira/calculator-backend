import "reflect-metadata";
import { UpdateUserBalanceUseCase } from "./UpdateUserBalanceUseCase";
import { IBalanceRepository } from "@modules/balance/repositories/IBalanceRepository";

describe("UpdateBalanceUseCase", () => {
  it("should update user balance", async () => {
    const userId = "user-id";
    const type = "credit";
    const value = 50;

    const balanceRepositoryMock: IBalanceRepository = {
      getBalance: jest.fn().mockResolvedValue({}),
      updateBalance: jest.fn().mockResolvedValue(150),
      createBalance: jest.fn().mockResolvedValue({}),
    };

    const updateBalanceUseCase = new UpdateUserBalanceUseCase(
      balanceRepositoryMock
    );

    const result = await updateBalanceUseCase.execute({ userId, type, value });

    expect(result).toBe(150);
    expect(balanceRepositoryMock.updateBalance).toHaveBeenCalledWith({
      userId,
      type,
      value,
    });
  });
});
