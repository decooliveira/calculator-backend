import "reflect-metadata";
import { IRequest } from "@shared/container/interfaces/IRequest";
import { OperationType } from "@shared/types/OperationType";
import { AppError } from "@shared/errors/AppError";

class PerformOperationUseCase {
  constructor() {}

  async execute({ a, b, operation }: IRequest): Promise<any> {
    let result = 0;
    switch (operation) {
      case OperationType.ADDITION:
        result = a + b;
        break;
      case OperationType.SUBTRACTION:
        result = a - b;
        break;
      case OperationType.MULTIPLICATION:
        result = a * b;
        break;
      case OperationType.DIVISION:
        if (b === 0) {
          throw new AppError("Sorry! Can't divide by zero.");
        }
        result = a / b;
        break;
      case OperationType.SQUARE_ROOT:
        if (a < 0) {
          throw new AppError("Operand should be > 0");
        }
        result = Math.sqrt(a);
        break;
      default:
        throw new AppError("Missing perform operation parameter!", 400);
    }

    return Promise.resolve(result);
  }
}
export { PerformOperationUseCase };
