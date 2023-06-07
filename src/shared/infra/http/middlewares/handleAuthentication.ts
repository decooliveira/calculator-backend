import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import auth from "@config/auth";
import { container } from "tsyringe";
import { ValidateExistingTokenUseCase } from "@modules/accounts/useCases/validateExistingTokenUseCase/VerifyUserTokenUseCase";

interface IPayload {
  sub: string;
}
interface IRequest extends Request {
  token: string;
}

export async function handleAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Missing auth token!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const validateExistingTokenUseCase = container.resolve(
      ValidateExistingTokenUseCase
    );

    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    const tokenExists = await validateExistingTokenUseCase.execute({
      userId: user_id,
      token,
    });

    if (!tokenExists) {
      throw new Error();
    }

    request.user = {
      id: user_id,
    };
    (request as IRequest).token = token;

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
