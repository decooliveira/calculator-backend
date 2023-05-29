import { UsersRepository } from "./UsersRepository";
import { User } from "../infra/typeorm/entities/User";
import { DataSource, Repository } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
const date = new Date();
const user: User = {
  id: "user-id",
  username: "username-test",
  password: "password-test",
  status: "active",
  createdAt: date,
};

const mockRepository: Partial<Repository<User>> = {
  findOne: jest
    .fn()
    .mockImplementation((request: any) => Promise.resolve(user)),
  save: jest.fn(),
  create: jest.fn().mockImplementation((any) => Promise.resolve(user)),
};

const dataSource = {
  initialize: jest.fn().mockResolvedValue({}),
  getRepository: jest.fn().mockReturnValue(mockRepository as any),
} as unknown as DataSource;

const mockAppDatasource = {
  get: jest.fn().mockReturnValue(dataSource),
};

describe("UsersRepository", () => {
  let usersRepository: UsersRepository;

  beforeEach(() => {
    usersRepository = new UsersRepository(mockAppDatasource);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const createUserDTO: ICreateUserDTO = {
        username: "testuser",
        password: "password",
        status: "active",
        id: "1",
      };

      const mockUser: User = {
        id: createUserDTO.id,
        username: createUserDTO.username,
        password: createUserDTO.password,
        status: createUserDTO.status,
        createdAt: new Date(),
      };

      jest
        .spyOn(usersRepository["repository"], "create")
        .mockReturnValue(mockUser);

      await usersRepository.create(createUserDTO);
      const mockSave = jest
        .spyOn(mockRepository, "save")
        .mockResolvedValue(null);
      expect(mockSave).toHaveBeenCalledWith(mockUser);
      expect(mockRepository.create).toHaveBeenCalledWith(createUserDTO);
    });
  });

  describe("findByUsername", () => {
    it("should find a user by username", async () => {
      const username = "testuser";
      const mockUser: User = {
        id: "1",
        username,
        password: "password",
        status: "active",
        createdAt: new Date(),
      };

      jest
        .spyOn(usersRepository["repository"], "findOne")
        .mockResolvedValue(mockUser);

      const result = await usersRepository.findByUsername(username);

      expect(usersRepository["repository"].findOne).toHaveBeenCalledWith({
        where: { username },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe("findById", () => {
    it("should find a user by ID", async () => {
      const id = "1";
      const mockUser: User = {
        id,
        username: "testuser",
        password: "password",
        status: "active",
        createdAt: new Date(),
      };

      jest
        .spyOn(usersRepository["repository"], "findOne")
        .mockResolvedValue(mockUser);

      const result = await usersRepository.findById(id);

      expect(usersRepository["repository"].findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockUser);
    });
  });
});
