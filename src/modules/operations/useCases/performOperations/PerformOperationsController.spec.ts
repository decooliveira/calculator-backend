import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { PerformOperationsController } from "./PerformOperationsController";
import { PerformOperationUseCase } from "./PerformOperationsUseCase";

jest.mock("./PerformOperationsUseCase"); // Mock the PerformOperationUseCase module

describe("PerformOperationsController", () => {
  let performOperationsController: PerformOperationsController;
  let performOperationUseCaseMock: jest.Mocked<PerformOperationUseCase>;
  let requestMock: jest.Mocked<Request> & { result?: any };
  let responseMock: jest.Mocked<Response>;
  let nextMock: jest.Mock<NextFunction>;

  beforeEach(() => {
    performOperationUseCaseMock = {
      execute: jest.fn().mockResolvedValue(42), // Mock the execute method and return a result
    } as jest.Mocked<PerformOperationUseCase>;

    requestMock = {
      body: {
        a: 10,
        b: 5,
      },
      query: {
        perform: "add",
      },
    } as unknown as jest.Mocked<Request>;
    responseMock = {} as jest.Mocked<Response>;
    nextMock = jest.fn();

    container.resolve = jest.fn().mockReturnValue(performOperationUseCaseMock);

    performOperationsController = new PerformOperationsController();
  });

  it("should perform the requested operation and set the result in the request object", async () => {
    await performOperationsController.handle(
      requestMock,
      responseMock,
      nextMock
    );

    expect(performOperationUseCaseMock.execute).toHaveBeenCalledWith({
      a: 10,
      b: 5,
      operation: "add",
    });
    expect(requestMock.result).toBe(42);
    expect(nextMock).toHaveBeenCalled();
  });
});
