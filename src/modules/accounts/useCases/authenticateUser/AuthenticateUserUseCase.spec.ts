import "reflect-metadata";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

jest.mock("bcrypt", () => ({
  compare: jest.fn().mockResolvedValue(true),
}));

describe("AuthenticateUserUseCase", () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let usersRepositoryMock: jest.Mocked<IUsersRepository>;

  beforeEach(() => {
    usersRepositoryMock = {
      findByUsername: jest.fn(),
    } as unknown as jest.Mocked<IUsersRepository>;

    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should authenticate a user and return a token", async () => {
    const username = "testuser";
    const password = "testpassword";

    const user: User = {
      id: "user_id",
      username,
      password: "hashed_password",
      status: "active",
      createdAt: new Date(),
    };

    const token = "generated_token";

    usersRepositoryMock.findByUsername.mockResolvedValue(user);
    (sign as jest.Mock).mockReturnValue(token);

    const response = await authenticateUserUseCase.execute({
      username,
      password,
    });

    expect(response).toHaveProperty("token", token);
    expect(response.user).toEqual({ username });

    expect(usersRepositoryMock.findByUsername).toHaveBeenCalledWith(username);
    expect(compare).toHaveBeenCalledWith(password, user.password);
    expect(sign).toHaveBeenCalledWith({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });
  });

  it("should throw an error when username is incorrect", async () => {
    const username = "testuser";
    const password = "testpassword";

    usersRepositoryMock.findByUsername.mockResolvedValue(null);

    await expect(
      authenticateUserUseCase.execute({ username, password })
    ).rejects.toEqual(new AppError("Username or password incorrect!"));

    expect(usersRepositoryMock.findByUsername).toHaveBeenCalledWith(username);
    expect(compare).not.toHaveBeenCalled();
    expect(sign).not.toHaveBeenCalled();
  });

  it("should throw an error when password is incorrect", async () => {
    const username = "testuser";
    const password = "testpassword";

    const user: User = {
      id: "user_id",
      username,
      password: "hashed_password",
      status: "active",
      createdAt: new Date(),
    };

    usersRepositoryMock.findByUsername.mockResolvedValue(user);
    (compare as jest.Mock).mockResolvedValue(false);

    await expect(
      authenticateUserUseCase.execute({ username, password })
    ).rejects.toEqual(new AppError("Username or password incorrect!"));

    expect(usersRepositoryMock.findByUsername).toHaveBeenCalledWith(username);
    expect(compare).toHaveBeenCalledWith(password, user.password);
    expect(sign).not.toHaveBeenCalled();
  });
});
