import { Operation } from "@modules/balance/infra/typeorm/entities/Operation";
import { Record } from "../infra/typeorm/entities/Record";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { RecordMapper } from "./RecordMap";

describe("RecordMapper", () => {
  it("should map Record to RecordDTO", () => {
    const record: Record = {
      id: "1",
      operation: {
        id: "op1",
        type: "addition",
        cost: 10,
      },
      operationId: "op1",
      user: {} as User,
      userId: "user1",
      operationResponse: "success",
      createdAt: new Date(),
      deletedAt: null,
    };

    const expectedRecordDTO = {
      id: "1",
      operationType: "addition",
      operationResult: "success",
      createdAt: record.createdAt,
      isDeleted: false,
    };

    const recordDTO = RecordMapper.toDTO(record);

    expect(recordDTO).toEqual(expectedRecordDTO);
  });

  it("should set isDeleted to true if deletedAt is not null", () => {
    const record: Record = {
      id: "2",
      operation: {
        type: "subtraction",
      } as Operation,
      user: {} as User, 
      operationId: "op2",
      userId: "user2",
      operationResponse: "23",
      createdAt: new Date(),
      deletedAt: new Date(),
    };

    const expectedRecordDTO = {
      id: "2",
      operationType: "subtraction",
      operationResult: "23",
      createdAt: record.createdAt,
      isDeleted: true,
    };

    const recordDTO = RecordMapper.toDTO(record);

    expect(recordDTO).toEqual(expectedRecordDTO);
  });
});
