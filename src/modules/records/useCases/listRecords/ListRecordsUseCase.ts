import { Record } from "@modules/records/infra/typeorm/entities/Record";
import { IRecordsRepository } from "@modules/records/repositories/IRecordsRepository";
import { IPageOptions } from "@shared/container/interfaces/IPageOptions";
import { IPageResponse } from "@shared/container/interfaces/IPageResponse";
import { IRecordFilterParams } from "@shared/container/interfaces/IRecordFilterParams";
import { ISortingOptions } from "@shared/container/interfaces/ISortingOptions";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRecordsUseCase {
  constructor(
    @inject("RecordsRepository")
    private recordsRepository: IRecordsRepository
  ) {}

  async execute(
    pageOptions: IPageOptions,
    filterParams: IRecordFilterParams,
    sortingOptions: ISortingOptions
  ): Promise<IPageResponse> {
    return await this.recordsRepository.list(
      pageOptions,
      filterParams,
      sortingOptions
    );
  }
}
export { ListRecordsUseCase };
