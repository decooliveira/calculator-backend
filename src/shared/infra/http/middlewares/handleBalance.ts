import { RetrieveOperationsSpecificationsUseCase } from "@modules/operations/useCases/retrieveOperationsSpecifications/RetrieveOperationsSpecificationsUseCase";
import { RetrieveUserBalanceUseCase } from "@modules/balance/useCases/retrieveBalanceUseCase/RetrieveUserBalanceUseCase";
import { UpdateUserBalanceUseCase } from "@modules/balance/useCases/updateBalance/UpdateUserBalanceUseCase";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { OperationType } from "@shared/types/OperationType";

export async function handleBalance(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const user = request["user"];
  const operationType = request.query.perform as OperationType;

  const operationUseCase = container.resolve(
    RetrieveOperationsSpecificationsUseCase
  );
  const updateBalanceUseCase = container.resolve(UpdateUserBalanceUseCase);
  const retrieveBalanceUseCase = container.resolve(RetrieveUserBalanceUseCase);

  //get the operation
  const operation = await operationUseCase.execute(operationType);

  //get balance
  const balance = await retrieveBalanceUseCase.execute({ userId: user.id });

  if (operation.cost > balance.amount) {
    throw new AppError(`You ran out of credits!`, 403);
  }

  //charge operation
  const updatedBalance = await updateBalanceUseCase.execute({
    userId: user.id,
    type: "debit",
    value: operation.cost,
  });

  request["balance"] = updatedBalance;
  request["operation"] = operation;
  next();
}

//get balance
// get operation cost
// verifiy and return or next
