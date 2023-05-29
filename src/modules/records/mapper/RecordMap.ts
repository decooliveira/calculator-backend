import { Record } from "../infra/typeorm/entities/Record";

class RecordMapper {
  static toDTO({
    id,
    operation,
    operationResponse,
    createdAt,
    deletedAt,
  }: Record): RecordDTO {
    const record: RecordDTO = {
      id,
      operationType: operation.type,
      operationResult: operationResponse,
      createdAt: createdAt,
      isDeleted: deletedAt ? true : false,
    };
    return record;
  }
}

export { RecordMapper };
