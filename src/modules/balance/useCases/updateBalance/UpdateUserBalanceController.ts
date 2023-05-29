import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserBalanceUseCase } from "./UpdateUserBalanceUseCase";
import { IBalanceRequest } from "@shared/container/interfaces/IBalanceRequest";

class UpdateUserBalanceController {
  constructor() {}

  async handle(request: Request, response: Response) {
    const userId = String(request.user.id);
    const value = Number(request.body.amount) || 0;
    const balanceRequest: IBalanceRequest = {
      userId,
      value,
      type: "credit",
    };
    const updateUserBalanceUseCase = container.resolve(
      UpdateUserBalanceUseCase
    );
    const balance = await updateUserBalanceUseCase.execute(balanceRequest);

    return response.status(200).json({ balance });
  }
}

export { UpdateUserBalanceController };
