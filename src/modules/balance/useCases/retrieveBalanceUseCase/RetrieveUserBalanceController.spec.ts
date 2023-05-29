import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { RetrieveUserBalanceController } from "./RetrieveUserBalanceController";
import { RetrieveUserBalanceUseCase } from "./RetrieveUserBalanceUseCase";

jest.mock("./RetrieveUserBalanceUseCase"); // Mock the RetrieveUserBalanceUseCase module

describe("RetrieveUserBalanceController", () => {
  let retrieveUserBalanceController: RetrieveUserBalanceController;
  let retrieveUserBalanceUseCaseMock: jest.Mocked<RetrieveUserBalanceUseCase>;
  let requestMock: jest.Mocked<Request>;
  let responseMock: jest.Mocked<Response>;

  beforeEach(() => {
    retrieveUserBalanceUseCaseMock = {
      execute: jest.fn().mockResolvedValue(500.0), // Mock the execute method and return a balance
    } as unknown as jest.Mocked<RetrieveUserBalanceUseCase>;

    requestMock = {
      user: {
        id: "user-id-123",
      },
    } as jest.Mocked<Request>;

    responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as jest.Mocked<Response>;

    container.resolve = jest
      .fn()
      .mockReturnValue(retrieveUserBalanceUseCaseMock);

    retrieveUserBalanceController = new RetrieveUserBalanceController();
  });

  it("should retrieve the user balance and return it", async () => {
    await retrieveUserBalanceController.handle(requestMock, responseMock);

    expect(retrieveUserBalanceUseCaseMock.execute).toHaveBeenCalledWith({
      userId: "user-id-123",
    });
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.json).toHaveBeenCalledWith(500.0);
  });
});
