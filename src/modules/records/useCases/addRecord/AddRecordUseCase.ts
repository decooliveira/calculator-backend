import "reflect-metadata";
import { Record } from "@modules/records/infra/typeorm/entities/Record";
import { IRecordsRepository } from "@modules/records/repositories/IRecordsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class AddRecordUseCase {
  constructor(
    @inject("RecordsRepository")
    private recordsRepository: IRecordsRepository
  ) {}

  async execute(record: Record): Promise<void> {
    this.recordsRepository.save(record);
  }
}
export { AddRecordUseCase };
