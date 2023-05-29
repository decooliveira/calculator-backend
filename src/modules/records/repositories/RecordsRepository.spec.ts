import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { RecordsRepository } from "./RecordsRepository";
import { Record } from "../infra/typeorm/entities/Record";
import { IPageOptions } from "@shared/container/interfaces/IPageOptions";
import { IPageResponse } from "@shared/container/interfaces/IPageResponse";
import { IRecordFilterParams } from "@shared/container/interfaces/IRecordFilterParams";
import { Operation } from "@modules/balance/infra/typeorm/entities/Operation";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { OperationType } from "@shared/types/OperationType";
import { ISortingOptions } from "@shared/container/interfaces/ISortingOptions";
import { Direction, OrderDirection } from "@shared/types/OrderDirections";
import { RecordSortingFields } from "@shared/types/RecordSortingFields";

const date = new Date();

const addition: Operation = {
  id: "1",
  type: "addition",
  cost: 2,
};

const subtraction: Operation = {
  id: "2",
  type: "subtraction",
  cost: 3,
};

const user: User = {
  id: "user-id",
  username: "usertest",
  password: "passwordtest",
  status: "active",
  createdAt: date,
};
// Define sample records for testing
const record1: Record = {
  id: "1",
  operation: addition,
  operationId: addition.id,
  user,
  userId: user.id,
  operationResponse: "1",
  createdAt: date,
  deletedAt: undefined,
};

const record2: Record = {
  id: "2",
  operation: subtraction,
  operationId: subtraction.id,
  user,
  userId: user.id,
  operationResponse: "2",
  createdAt: new Date(),
  deletedAt: new Date(),
};
// Create mock instances for the mocked methods
const mockQueryBuilder: Partial<SelectQueryBuilder<Record>> = {
  leftJoinAndSelect: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  take: jest.fn().mockReturnThis(),
  withDeleted: jest.fn().mockReturnThis(),
  getManyAndCount: jest.fn().mockResolvedValue([[record1, record2], 2]),
};

const mockRepository: Partial<Repository<Record>> = {
  createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
  save: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
  softDelete: jest.fn().mockResolvedValue(undefined),
};

const dataSource = {
  initialize: jest.fn().mockResolvedValue({}),
  getRepository: jest.fn().mockReturnValue(mockRepository as any),
} as unknown as DataSource;

const mockAppDatasource = {
  get: jest.fn().mockReturnValue(dataSource),
};
describe("RecordsRepository", () => {
  let recordsRepository: RecordsRepository;

  beforeEach(() => {
    recordsRepository = new RecordsRepository(mockAppDatasource);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should save a record", async () => {
    const recordToSave: Record = {
      id: "",
      operation: new Operation(),
      operationId: "",
      user: new User(),
      userId: "",
      operationResponse: "",
      createdAt: undefined,
      deletedAt: undefined,
    };

    await recordsRepository.save(recordToSave);

    expect(mockRepository.save).toHaveBeenCalledWith(recordToSave);
  });

  it("should delete a record", async () => {
    const recordId = "record-id";

    await recordsRepository.delete(recordId);

    expect(mockRepository.softDelete).toHaveBeenCalledWith(recordId);
  });

  it("should list records with proper filters", async () => {
    const dto1: RecordDTO = {
      id: "1",
      operationType: OperationType.ADDITION,
      operationResult: "1",
      createdAt: date,
      isDeleted: false,
    };

    const dto2: RecordDTO = {
      id: "2",
      operationType: OperationType.SUBTRACTION,
      operationResult: "2",
      createdAt: date,
      isDeleted: true,
    };

    const pageOptions: IPageOptions = {
      pageSize: 10,
      page: 1,
      userId: "user-id",
    };

    const filterParams: IRecordFilterParams = {
      operation: "addition",
      includeDeleted: true,
    };

    const sortingOptions: ISortingOptions = {
      sortBy: RecordSortingFields.DATE,
      direction: Direction.Descending,
    };

    const expectedResult: IPageResponse = {
      records: [dto1, dto2],
      total: 2,
      pages: 1,
    };

    const result = await recordsRepository.list(
      pageOptions,
      filterParams,
      sortingOptions
    );

    expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
    expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
      "records.operation",
      "operations"
    );
    expect(mockQueryBuilder.where).toHaveBeenCalledWith(
      "records.operation_id = operations.id"
    );
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      "operations.type = :type",
      { type: filterParams.operation }
    );
    expect(mockQueryBuilder.withDeleted).toHaveBeenCalled();
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      "user_id = :userId",
      { userId: pageOptions.userId }
    );
    expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
      RecordSortingFields.DATE,
      Direction.Descending
    );
    expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0);
    expect(mockQueryBuilder.take).toHaveBeenCalledWith(pageOptions.pageSize);
    expect(mockQueryBuilder.getManyAndCount).toHaveBeenCalled();

    expect(result).toEqual(expectedResult);
  });
});
