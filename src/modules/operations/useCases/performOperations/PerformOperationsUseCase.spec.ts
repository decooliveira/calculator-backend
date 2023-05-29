import "reflect-metadata";
import { PerformOperationUseCase } from "./PerformOperationsUseCase";
import { IRequest } from "@shared/container/interfaces/IRequest";
import { OperationType } from "@shared/types/OperationType";
import { AppError } from "@shared/errors/AppError";
import { container } from "tsyringe";
import { RandomStringGenerationUseCase } from "../generateRandomString/RandomStringGenerationUseCase";

jest.mock("tsyringe", () => ({
  container: {
    resolve: jest.fn(),
  },
}));

describe("PerformsOperationUseCase", () => {
  let performOperationUseCase: PerformOperationUseCase;
  let randomStringGenerationUseCaseMock: jest.Mocked<RandomStringGenerationUseCase>;

  beforeEach(() => {
    randomStringGenerationUseCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<RandomStringGenerationUseCase>;

    (container.resolve as jest.Mock).mockReturnValue(
      randomStringGenerationUseCaseMock
    );

    performOperationUseCase = new PerformOperationUseCase();
  });

  it("should perform addition operation", async () => {
    const request: IRequest = {
      a: 10,
      b: 5,
      operation: OperationType.ADDITION,
    };

    const result = await performOperationUseCase.execute(request);

    expect(result).toBe(15);
  });

  it("should throw an error for division by zero", async () => {
    const request: IRequest = {
      a: 10,
      b: 0,
      operation: OperationType.DIVISION,
    };

    await expect(performOperationUseCase.execute(request)).rejects.toEqual(
      new AppError("Sorry! Can't divide by zero.")
    );
  });

  it("should perform square root operation", async () => {
    const request: IRequest = {
      a: 16,
      b: 0,
      operation: OperationType.SQUARE_ROOT,
    };

    const result = await performOperationUseCase.execute(request);

    expect(result).toBe(4);
  });

  it("should throw an error for missing operation parameter", async () => {
    const request: IRequest = {
      a: 10,
      b: 5,
      operation: "" as OperationType,
    };

    await expect(performOperationUseCase.execute(request)).rejects.toEqual(
      new AppError("Missing perform operation parameter!")
    );
  });
});
