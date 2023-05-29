import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { RandomStringGenerationController } from "./RandomStringGenerationController";
import { RandomStringGenerationUseCase } from "./RandomStringGenerationUseCase";

jest.mock("./RandomStringGenerationUseCase"); // Mock the RandomStringGenerationUseCase module

describe("RandomStringGenerationController", () => {
  let randomStringGenerationController: RandomStringGenerationController;
  let randomStringGenerationUseCaseMock: jest.Mocked<RandomStringGenerationUseCase>;
  let requestMock: jest.Mocked<Request> & {
    operation?: string;
    result?: string;
  };
  let responseMock: jest.Mocked<Response>;
  let nextMock: jest.Mock<NextFunction>;

  beforeEach(() => {
    randomStringGenerationUseCaseMock = {
      execute: jest.fn().mockResolvedValue("random_string_result"), // Mock the execute method and return a random string
    } as unknown as jest.Mocked<RandomStringGenerationUseCase>;

    requestMock = {} as jest.Mocked<Request>;
    responseMock = {} as jest.Mocked<Response>;
    requestMock.operation = "random_string";
    nextMock = jest.fn();

    container.resolve = jest
      .fn()
      .mockReturnValue(randomStringGenerationUseCaseMock);

    randomStringGenerationController = new RandomStringGenerationController();
  });

  it("should generate a random string and set it in the request object", async () => {
    await randomStringGenerationController.handle(
      requestMock,
      responseMock,
      nextMock
    );

    expect(randomStringGenerationUseCaseMock.execute).toHaveBeenCalled();
    expect(requestMock.result).toBe("random_string_result");
    expect(requestMock.operation).toBe("random_string");
    expect(nextMock).toHaveBeenCalled();
  });
});
