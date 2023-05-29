import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserBalanceUseCase } from "./UpdateUserBalanceUseCase";
import { UpdateUserBalanceController } from "./UpdateUserBalanceController";

jest.mock("./UpdateUserBalanceUseCase"); // Mock the UpdateUserBalanceUseCase dependency

describe("UpdateUserBalanceController", () => {
  let updateUserBalanceController: UpdateUserBalanceController;
  let updateUserBalanceUseCase: jest.Mocked<UpdateUserBalanceUseCase>;
  let request: Partial<Request>;
  let response: Partial<Response>;

  beforeEach(() => {
    updateUserBalanceUseCase = {
      execute: jest.fn().mockResolvedValue(500.0), // Mock the execute method and return a balance
    } as unknown as jest.Mocked<UpdateUserBalanceUseCase>;
    //updateUserBalanceUseCase = new UpdateUserBalanceUseCase() as jest.Mocked<UpdateUserBalanceUseCase>;
    updateUserBalanceController = new UpdateUserBalanceController();

    request = {
      user: { id: "123" },
      body: { amount: 100 },
    };

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    container.resolve = jest.fn().mockReturnValue(updateUserBalanceUseCase);
  });

  it("should update user balance and return the updated balance", async () => {
    updateUserBalanceUseCase.execute.mockResolvedValueOnce(500); // Mock the execute method of the use case

    await updateUserBalanceController.handle(
      request as Request,
      response as Response
    );

    expect(updateUserBalanceUseCase.execute).toHaveBeenCalledWith({
      userId: "123",
      value: 100,
      type: "credit",
    });
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ balance: 500 });
  });
});
