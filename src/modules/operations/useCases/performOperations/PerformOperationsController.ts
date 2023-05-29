import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { IRequest } from "@shared/container/interfaces/IRequest";
import { PerformOperationUseCase } from "./PerformOperationsUseCase";
import { OperationDTO } from "@modules/operations/dto/OperationDTO";

class PerformOperationsController {
  constructor() {}

  async handle(request: Request, response: Response, next: NextFunction) {
    const { a = 0, b = 0 }: OperationDTO = request.body;
    const operation = String(request.query.perform);
    const params: IRequest = { a, b, operation };
    const performOperationUseCase = container.resolve(PerformOperationUseCase);
    console.log(operation);
    const result = await performOperationUseCase.execute(params);
    request["result"] = result;
    next();
  }
}

export { PerformOperationsController };
