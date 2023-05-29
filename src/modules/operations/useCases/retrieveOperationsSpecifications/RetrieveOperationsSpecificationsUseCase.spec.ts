import "reflect-metadata";
import { OperationType } from "@shared/types/OperationType";
import { RetrieveOperationsSpecificationsUseCase } from "./RetrieveOperationsSpecificationsUseCase";
import { IOperationRepository } from "@modules/balance/repositories/IOperationRepository";
import { Operation } from "@modules/balance/infra/typeorm/entities/Operation";

describe("RetrieveOperationsSpecificationsUseCase", () => {
  let retrieveOperationsSpecificationsUseCase: RetrieveOperationsSpecificationsUseCase;
  let operationRepositoryMock: jest.Mocked<IOperationRepository>;

  beforeEach(() => {
    operationRepositoryMock = {
      findByType: jest.fn(),
    };

    retrieveOperationsSpecificationsUseCase =
      new RetrieveOperationsSpecificationsUseCase(operationRepositoryMock);
  });

  it("should retrieve the operation specifications by type", async () => {
    const operationType = OperationType.ADDITION;
    const operation: Operation = {
      type: OperationType.ADDITION,
      id: "",
      cost: 0,
    };

    operationRepositoryMock.findByType.mockResolvedValue(operation);

    const result = await retrieveOperationsSpecificationsUseCase.execute(
      operationType
    );

    expect(result).toEqual(operation);
    expect(operationRepositoryMock.findByType).toHaveBeenCalledWith(
      operationType
    );
  });
});
