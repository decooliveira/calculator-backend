import { IRecordsRepository } from '@modules/records/repositories/IRecordsRepository';
import { DeleteRecordsUseCase } from './DeleteRecordUseCase';

describe('DeleteRecordsUseCase', () => {
  let deleteRecordsUseCase: DeleteRecordsUseCase;
  let recordsRepository: IRecordsRepository;

  beforeEach(() => {
    recordsRepository = {
      delete: jest.fn(),
    } as unknown as IRecordsRepository;

    deleteRecordsUseCase = new DeleteRecordsUseCase(recordsRepository);
  });

  it('should delete the record', async () => {
    const recordId = '123456';

    await deleteRecordsUseCase.execute(recordId);

    expect(recordsRepository.delete).toHaveBeenCalledWith(recordId);
  });
});
