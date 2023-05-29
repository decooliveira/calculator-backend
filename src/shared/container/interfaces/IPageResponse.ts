import { Record } from "@modules/records/infra/typeorm/entities/Record";

export interface IPageResponse {
  records: RecordDTO[];
  pages: number;
  total: number;
}
