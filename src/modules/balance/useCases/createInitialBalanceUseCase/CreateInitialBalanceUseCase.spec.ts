import "reflect-metadata";
import { container } from "tsyringe";
import { CreateInitialBalanceUseCase } from "./CreateInitialBalanceUseCase";
import { IBalanceRepository } from "@modules/balance/repositories/IBalanceRepository";

describe("CreateInitialBalanceUseCase", () => {
  let balanceRepositoryMock: jest.Mocked<IBalanceRepository>;

  it("should create an initial balance", async () => {
    balanceRepositoryMock = {
      getBalance: jest.fn().mockResolvedValue({}),
      updateBalance: jest.fn().mockResolvedValue(200),
      createBalance: jest.fn().mockResolvedValue({}),
    };

    const userId = "user123";

    container.resolve = jest.fn().mockReturnValue(balanceRepositoryMock);

    const createInitialBalanceUseCase = new CreateInitialBalanceUseCase(
      balanceRepositoryMock
    );

    await createInitialBalanceUseCase.execute({ userId });

    expect(balanceRepositoryMock.createBalance).toHaveBeenCalledWith({
      userId,
    });
  });
});
