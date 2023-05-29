import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

jest.mock("./AuthenticateUserUseCase");

describe("AuthenticateUserController", () => {
  let authenticateUserController: AuthenticateUserController;
  let authenticateUserUseCaseMock: jest.Mocked<AuthenticateUserUseCase>;
  let requestMock: jest.Mocked<Request>;
  let responseMock: jest.Mocked<Response>;

  beforeEach(() => {
    authenticateUserUseCaseMock = {
      execute: jest.fn().mockResolvedValue("mockedToken"),
    } as unknown as jest.Mocked<AuthenticateUserUseCase>;

    requestMock = {
      body: {
        username: "johndoe",
        password: "pass123",
      },
    } as jest.Mocked<Request>;

    responseMock = {
      json: jest.fn().mockReturnThis(),
    } as unknown as jest.Mocked<Response>;

    container.resolve = jest.fn().mockReturnValue(authenticateUserUseCaseMock);

    authenticateUserController = new AuthenticateUserController();
  });

  it("should authenticate a user and return a token", async () => {
    await authenticateUserController.handle(requestMock, responseMock);

    expect(authenticateUserUseCaseMock.execute).toHaveBeenCalledWith({
      username: "johndoe",
      password: "pass123",
    });
    expect(responseMock.json).toHaveBeenCalledWith("mockedToken");
  });
});
