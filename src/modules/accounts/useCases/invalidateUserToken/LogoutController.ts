import { Request, Response } from "express";
import { container } from "tsyringe";
import auth from "@config/auth";
import { LogoutUseCase } from "./LogoutUseCase";
import { AppError } from "@shared/errors/AppError";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

interface IRequest extends Request {
  token: string;
}

class LogoutController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token = (request as IRequest).token;
    const id = request.user.id;

    const logoutUseCase = container.resolve(LogoutUseCase);
    await logoutUseCase.execute({ userId: id, token });

    return response.status(200).send();
  }
}

export { LogoutController };
