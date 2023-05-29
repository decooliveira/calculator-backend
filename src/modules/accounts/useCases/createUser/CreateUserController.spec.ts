import "reflect-metadata";
import { Request, Response } from "express";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";
import { container } from "tsyringe";

jest.mock("./CreateUserUseCase");

describe("CreateUserController", () => {
  let createUserController: CreateUserController;
  let createUserUseCaseMock: jest.Mocked<CreateUserUseCase>;
  let requestMock: jest.Mocked<Request>;
  let responseMock: jest.Mocked<Response>;

  beforeEach(() => {
    createUserUseCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateUserUseCase>;

    requestMock = {
      body: {
        username: "johndoe@example.com",
        password: "pass123",
      },
    } as jest.Mocked<Request>;

    responseMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as jest.Mocked<Response>;

    container.resolve = jest.fn().mockReturnValue(createUserUseCaseMock);

    createUserController = new CreateUserController();
  });

  it("should create a new user when valid username and password are provided", async () => {
    await createUserController.handle(requestMock, responseMock);

    expect(createUserUseCaseMock.execute).toHaveBeenCalledWith({
      username: "johndoe@example.com",
      password: "pass123",
    });
    expect(responseMock.status).toHaveBeenCalledWith(201);
    expect(responseMock.send).toHaveBeenCalled();
  });

  it("should throw an error when username or password is missing", async () => {
    requestMock.body.username = "";
    requestMock.body.password = "";

    await expect(
      createUserController.handle(requestMock, responseMock)
    ).rejects.toEqual(
      new AppError("Please provide username and password", 401)
    );
    expect(responseMock.status).not.toHaveBeenCalledWith(401);
    expect(responseMock.send).not.toHaveBeenCalled();
  });
});
