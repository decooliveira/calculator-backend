import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { OperationType } from "@shared/types/OperationType";
import { IOperationRepository } from "@modules/balance/repositories/IOperationRepository";
import { Operation } from "@modules/balance/infra/typeorm/entities/Operation";

@injectable()
class RetrieveOperationsSpecificationsUseCase {
  constructor(
    @inject("OperationRepository")
    private operationRepository: IOperationRepository
  ) {}

  async execute(operationType: OperationType): Promise<Operation> {
    const operation = await this.operationRepository.findByType(operationType);
    return operation;
  }
}
export { RetrieveOperationsSpecificationsUseCase };
