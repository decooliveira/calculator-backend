import "reflect-metadata";
import { Record } from "@modules/records/infra/typeorm/entities/Record";
import { IRecordsRepository } from "@modules/records/repositories/IRecordsRepository";
import { AddRecordUseCase } from "./AddRecordUseCase";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Operation } from "@modules/balance/infra/typeorm/entities/Operation";

describe("AddRecordUseCase", () => {
  let addRecordUseCase: AddRecordUseCase;
  let recordsRepositoryMock: jest.Mocked<IRecordsRepository>;

  beforeEach(() => {
    recordsRepositoryMock = {
      save: jest.fn(),
      delete: jest.fn(),
      list: jest.fn(),
    };

    addRecordUseCase = new AddRecordUseCase(recordsRepositoryMock);
  });

  it("should add a record", async () => {
    const record: Record = {
      id: "",
      operation: new Operation(),
      operationId: "",
      user: new User(),
      userId: "",
      operationResponse: "",
      createdAt: undefined,
      deletedAt: undefined,
    };

    await addRecordUseCase.execute(record);

    expect(recordsRepositoryMock.save).toHaveBeenCalledWith(record);
  });
});
