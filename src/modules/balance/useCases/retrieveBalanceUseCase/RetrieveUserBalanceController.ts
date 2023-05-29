import { Request, Response } from "express";
import { container } from "tsyringe";
import { RetrieveUserBalanceUseCase } from "./RetrieveUserBalanceUseCase";
import { IBalanceRequest } from "@shared/container/interfaces/IBalanceRequest";

class RetrieveUserBalanceController {
  constructor() {}

  async handle(request: Request, response: Response) {
    const userId = String(request.user.id);
    const balanceRequest: IBalanceRequest = { userId };
    const retrieveBalanceUseCase = container.resolve(
      RetrieveUserBalanceUseCase
    );
    const balance = await retrieveBalanceUseCase.execute(balanceRequest);

    return response.status(200).json(balance);
  }
}

export { RetrieveUserBalanceController };
