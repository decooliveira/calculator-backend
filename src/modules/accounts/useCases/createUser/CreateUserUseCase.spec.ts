import "reflect-metadata";
import { hash } from "bcrypt";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { container } from "tsyringe";
import { CreateInitialBalanceUseCase } from "@modules/balance/useCases/createInitialBalanceUseCase/CreateInitialBalanceUseCase";
import { IBalanceRepository } from "@modules/balance/repositories/IBalanceRepository";

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashed_password"),
}));

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let usersRepositoryMock: jest.Mocked<IUsersRepository>;
  let balanceRepositoryMock: jest.Mocked<IBalanceRepository>;
  let createInitialBalanceUseCase: CreateInitialBalanceUseCase;

  beforeEach(() => {
    balanceRepositoryMock = {
      getBalance: jest.fn().mockResolvedValue({}),
      updateBalance: jest.fn().mockResolvedValue(150),
      createBalance: jest.fn().mockResolvedValue({}),
    };

    createInitialBalanceUseCase = new CreateInitialBalanceUseCase(
      balanceRepositoryMock
    );
  container.resolve = jest.fn().mockReturnValue(createInitialBalanceUseCase);

    usersRepositoryMock = {
      findByUsername: jest.fn().mockResolvedValue({ userId: "user-id-123" }),
      create: jest.fn(),
      findById: jest.fn().mockResolvedValue({ userId: "user-id-123" }),
    } as jest.Mocked<IUsersRepository>;

    createUserUseCase = new CreateUserUseCase(usersRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user", async () => {
    const username = "johndoe@example.com";
    const password = "pass123";

    usersRepositoryMock.findByUsername.mockResolvedValueOnce(null);
    container.resolve = jest.fn().mockReturnValue(createInitialBalanceUseCase);

    await createUserUseCase.execute({ username, password });

    expect(usersRepositoryMock.findByUsername).toHaveBeenCalledWith(username);

    expect(hash).toHaveBeenCalledWith(password, 8);
    expect(usersRepositoryMock.create).toHaveBeenCalledWith({
      username,
      password: "hashed_password",
      status: "active",
    });
  });

  it("should throw an error if the username is already taken", async () => {
    const username = "johndoe@example.com";
    const password = "pass123";

    usersRepositoryMock.findByUsername.mockResolvedValueOnce({} as any);

    await expect(
      createUserUseCase.execute({ username, password })
    ).rejects.toEqual(new AppError("User already exists"));

    expect(usersRepositoryMock.findByUsername).toHaveBeenCalledWith(username);
    expect(hash).not.toHaveBeenCalled();
    expect(usersRepositoryMock.create).not.toHaveBeenCalled();
  });
});
