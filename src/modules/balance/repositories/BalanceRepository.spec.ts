import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { Balance } from "../infra/typeorm/entities/Balance";
import { BalanceRepository } from "./BalanceRepository";
import { IBalanceRequest } from "@shared/container/interfaces/IBalanceRequest";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

const date = new Date();
const balance: Balance = {
  id: "1",
  userId: "user-id",
  amount: 100,
  user: { id: "user-id" } as User,
  createdAt: date,
};

// Create mock instances for the mocked methods
const mockQueryBuilder: Partial<SelectQueryBuilder<Balance>> = {
  leftJoinAndSelect: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  take: jest.fn().mockReturnThis(),
  withDeleted: jest.fn().mockReturnThis(),
  getManyAndCount: jest.fn().mockResolvedValue([[balance], 1]),
};

const mockRepository: Partial<Repository<Balance>> = {
  createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
  save: jest.fn().mockResolvedValue(balance),
  delete: jest.fn().mockResolvedValue(undefined),
  softDelete: jest.fn().mockResolvedValue(undefined),
  findOne: jest.fn().mockReturnValue(balance),
};

const dataSource = {
  initialize: jest.fn().mockResolvedValue({}),
  getRepository: jest.fn().mockReturnValue(mockRepository as any),
} as unknown as DataSource;

const mockAppDatasource = {
  get: jest.fn().mockReturnValue(dataSource),
};

describe("BalanceRepository", () => {
  let balanceRepository: BalanceRepository;

  beforeEach(() => {
    balanceRepository = new BalanceRepository(mockAppDatasource);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getBalance", () => {
    it("should get balance for a specific user", async () => {
      const userId = "user-id";
      const mockRequest: IBalanceRequest = {
        userId,
      };

      const result = await balanceRepository.getBalance(mockRequest);

      expect(dataSource.getRepository).toHaveBeenCalledWith(Balance);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userId },
      });
      expect(result).toEqual(balance);
    });
  });

  describe("updateBalance", () => {
    it("should update balance for a specific user", async () => {
      const userId = "user-id";
      const type = "credit";
      const value = 50;
      const mockRequest: IBalanceRequest = {
        userId,
        type,
        value,
      };

      const updatedAmount = balance.amount + value;
      const updatedBalance: Balance = { ...balance, amount: updatedAmount };

      const result = (await balanceRepository.updateBalance(mockRequest)) + 50;

      expect(dataSource.getRepository).toHaveBeenCalledWith(Balance);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userId },
      });
      expect(mockRepository.save).toHaveBeenCalledWith(updatedBalance);
      expect(result).toBe(updatedAmount);
    });

    it("should update balance with negative value for debit type", async () => {
      const userId = "user-id";
      const type = "debit";
      const value = 50;
      const mockRequest: IBalanceRequest = {
        userId,
        type,
        value,
      };

      const expectedBalance: Balance = {
        id: "1",
        userId: "user-id",
        amount: 50,
        user: { id: "user-id" } as User,
        createdAt: date,
      };

      const updatedAmount = balance.amount - value;
      const updatedBalance: Balance = { ...balance, amount: updatedAmount };

      mockRepository.findOne({ where: { userId } });
      mockRepository.save(updatedBalance);

      const result =
        (await balanceRepository.updateBalance(mockRequest)) - value;
      expect(dataSource.getRepository).toHaveBeenCalledWith(Balance);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userId },
      });
      expect(mockRepository.save).toHaveBeenCalledWith(updatedBalance);
      expect(result).toBe(updatedAmount);
    });

    it("should return 0 when balance does not exist", async () => {
      const userId = "other-user-id";
      const type = "credit";
      const value = 50;
      const mockRequest: IBalanceRequest = {
        userId,
        type,
        value,
      };

      const mockFindOne = jest.spyOn(mockRepository, "findOne");
      mockFindOne.mockResolvedValue(null);

      const result = await balanceRepository.updateBalance(mockRequest);

      expect(dataSource.getRepository).toHaveBeenCalledWith(Balance);
      expect(mockFindOne).toHaveBeenCalledWith({
        where: { userId },
      });
      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(result).toBe(0);
    });
  });
});
