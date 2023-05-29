import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { RandomStringGenerationUseCase } from "./RandomStringGenerationUseCase";

class RandomStringGenerationController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const multiplyUseCase = container.resolve(RandomStringGenerationUseCase);
    const result = await multiplyUseCase.execute();
    request["result"] = result;

    next();
  }
}

export { RandomStringGenerationController };
