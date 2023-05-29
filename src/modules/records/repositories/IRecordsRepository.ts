import { IPageOptions } from "@shared/container/interfaces/IPageOptions";
import { Record } from "../infra/typeorm/entities/Record";
import { IPageResponse } from "@shared/container/interfaces/IPageResponse";
import { IRecordFilterParams } from "@shared/container/interfaces/IRecordFilterParams";
import { ISortingOptions } from "@shared/container/interfaces/ISortingOptions";

interface IRecordsRepository {
  list(
    pageOptions: IPageOptions,
    filterParams: IRecordFilterParams,
    sortingOptions: ISortingOptions
  ): Promise<IPageResponse>;
  save(record: Record): Promise<void>;
  delete(recordId: string): Promise<void>;
}

export { IRecordsRepository };
