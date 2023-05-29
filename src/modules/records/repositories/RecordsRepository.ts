import { Record } from "../infra/typeorm/entities/Record";
import { IRecordsRepository } from "./IRecordsRepository";
import { Repository } from "typeorm";
import { IPageOptions } from "@shared/container/interfaces/IPageOptions";
import { IPageResponse } from "@shared/container/interfaces/IPageResponse";
import { IRecordFilterParams } from "@shared/container/interfaces/IRecordFilterParams";
import { RecordMapper } from "../mapper/RecordMap";
import { ISortingOptions } from "@shared/container/interfaces/ISortingOptions";
import { inject, injectable } from "tsyringe";
import { IAppDatasource } from "@shared/infra/typeorm/IAppDataSource";

@injectable()
class RecordsRepository implements IRecordsRepository {
  private repository: Repository<Record>;

  constructor(
    @inject("AppDatasource")
    private dataSource: IAppDatasource
  ) {
    this.repository = dataSource.get().getRepository(Record);
  }

  async list(
    { pageSize = 10, page = 1, userId }: IPageOptions,
    { operation, includeDeleted = false }: IRecordFilterParams,
    { sortBy = "records.createdAt", direction = `DESC` }: ISortingOptions
  ): Promise<IPageResponse> {
    try {
      const skip = (page - 1) * pageSize;
      const queryBuilder = this.repository
        .createQueryBuilder("records")
        .leftJoinAndSelect("records.operation", "operations")

        .where("records.operation_id = operations.id")

        .andWhere(operation ? "operations.type = :type" : "1=1", {
          type: operation,
        });

      if (includeDeleted) {
        queryBuilder.withDeleted();
      }

      queryBuilder
        .andWhere(`user_id = :userId`, { userId })
        .skip(skip)
        .take(pageSize);
      if (sortBy) {
        queryBuilder.orderBy(`${sortBy}`, direction);
      }

      const result = await queryBuilder.getManyAndCount();
      const total = result[1];
      const recordEntities = result[0] as Record[];
      const pages = Math.ceil(total / pageSize);
      const records: RecordDTO[] = recordEntities.map((entity) =>
        RecordMapper.toDTO(entity)
      );
      return Promise.resolve({ records, total, pages });
    } catch (error) {
      throw new Error(error);
    }
  }

  async save(record: Record): Promise<void> {
    await this.repository.save(record);
    return Promise.resolve();
  }

  async delete(recordId: string): Promise<void> {
    await this.repository.softDelete(recordId);
  }
}

export { RecordsRepository };
