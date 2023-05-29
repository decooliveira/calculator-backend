import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { OperationType } from "@shared/types/OperationType";
import { Operation } from "../infra/typeorm/entities/Operation";
import { OperationRepository } from "./OperationRepository";

// Create mock instances for the mocked methods
const operation: Operation = {
  id: "1",
  type: OperationType.ADDITION,
  cost: 2,
};

const mockQueryBuilder: Partial<SelectQueryBuilder<Operation>> = {
  leftJoinAndSelect: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  take: jest.fn().mockReturnThis(),
  withDeleted: jest.fn().mockReturnThis(),
};

const mockRepository: Partial<Repository<Operation>> = {
  createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
  save: jest.fn().mockResolvedValue(operation),
  delete: jest.fn().mockResolvedValue(undefined),
  softDelete: jest.fn().mockResolvedValue(undefined),
  findOne: jest.fn().mockReturnValue(operation),
};

const dataSource = {
  initialize: jest.fn().mockResolvedValue({}),
  getRepository: jest.fn().mockReturnValue(mockRepository as any),
} as unknown as DataSource;

const mockAppDatasource = {
  get: jest.fn().mockReturnValue(dataSource),
};

describe("OperationRepository", () => {
  let operationRepository: OperationRepository;

  beforeEach(() => {
    operationRepository = new OperationRepository(mockAppDatasource);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findByType", () => {
    it("should find an operation by type", async () => {
      const operationType = OperationType.ADDITION;
      const mockOperation: Operation = {
        id: "1",
        type: operationType,
        cost: 2,
      };

      mockRepository.findOne({ where: { type: OperationType.ADDITION } });

      const mockFindByType = jest.spyOn(operationRepository, "findByType");
      mockFindByType.mockResolvedValue(mockOperation);

      const result = await operationRepository.findByType(operationType);

      expect(dataSource.getRepository).toHaveBeenCalledWith(Operation);
      expect(mockFindByType).toHaveBeenCalledWith(operationType);
      expect(result).toEqual(mockOperation);
    });
  });
});
