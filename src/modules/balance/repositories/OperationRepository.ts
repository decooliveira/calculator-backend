import { OperationType } from "@shared/types/OperationType";
import { Operation } from "../infra/typeorm/entities/Operation";
import { IOperationRepository } from "./IOperationRepository";
import { Repository } from "typeorm";
import { inject, injectable } from "tsyringe";
import { IAppDatasource } from "@shared/infra/typeorm/IAppDataSource";

@injectable()
class OperationRepository implements IOperationRepository {
  private repository: Repository<Operation>;

  constructor(
    @inject("AppDatasource")
    private dataSource: IAppDatasource
  ) {
    this.repository = dataSource.get().getRepository(Operation);
  }

  async findByType(type: OperationType): Promise<Operation> {
    const operation = await this.repository.findOne({ where: { type } });
    return operation;
  }
}

export { OperationRepository };
