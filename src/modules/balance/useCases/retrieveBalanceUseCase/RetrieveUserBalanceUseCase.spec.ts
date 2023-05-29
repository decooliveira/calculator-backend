import "reflect-metadata";
import { RetrieveUserBalanceUseCase } from "./RetrieveUserBalanceUseCase";
import { IBalanceRepository } from "@modules/balance/repositories/IBalanceRepository";
import { BalanceDTO } from "@modules/balance/dtos/BalanceDTO";

describe("RetrieveUserBalanceUseCase", () => {
  it("should retrieve user balance", async () => {
    // Arrange
    const userId = "user-id";
    const balanceData = {
      userId,
      amount: 100,
    };
    const expectedBalanceDTO: BalanceDTO = {
      amount: 100,
    };

    const balanceRepositoryMock: IBalanceRepository = {
      getBalance: jest.fn().mockResolvedValue(balanceData),
      updateBalance: jest.fn().mockResolvedValue(balanceData),
      createBalance: jest.fn().mockResolvedValue(balanceData),
    };

    const retrieveUserBalanceUseCase = new RetrieveUserBalanceUseCase(
      balanceRepositoryMock
    );

    // Act
    const result = await retrieveUserBalanceUseCase.execute({ userId });

    // Assert
    expect(result).toEqual(expectedBalanceDTO);
    expect(balanceRepositoryMock.getBalance).toHaveBeenCalledWith({ userId });
  });
});
