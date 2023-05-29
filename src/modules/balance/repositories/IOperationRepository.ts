import { OperationType } from "@shared/types/OperationType";
import { Operation } from "../infra/typeorm/entities/Operation";

interface IOperationRepository {
  findByType(type: OperationType): Promise<Operation>;
}

export { IOperationRepository };
