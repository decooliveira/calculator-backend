import "reflect-metadata";
import { IRecordsRepository } from "@modules/records/repositories/IRecordsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteRecordsUseCase {
  constructor(
    @inject("RecordsRepository")
    private recordsRepository: IRecordsRepository
  ) {}

  async execute(recordId: string): Promise<void> {
    return await this.recordsRepository.delete(recordId);
  }
}
export { DeleteRecordsUseCase };
