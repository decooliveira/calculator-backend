import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { Record } from "@modules/records/infra/typeorm/entities/Record";
import { container } from "tsyringe";
import { AddRecordUseCase } from "@modules/records/useCases/addRecord/AddRecordUseCase";
import { RetrieveOperationsSpecificationsUseCase } from "@modules/operations/useCases/retrieveOperationsSpecifications/RetrieveOperationsSpecificationsUseCase";
import { UpdateBalanceUseCase } from "@modules/balance/useCases/updateBalance/UpdateUserBalanceUseCase";

export async function handleOperationResponse(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response> {
  const result = request["result"];
  const user = request["user"];
  const operation = request["operation"];
  const balance = request["balance"];

  try {
    const addRecordUseCase = container.resolve(AddRecordUseCase);
    const record = new Record();
    record.operationId = operation.id;
    record.operationResponse = result.toString();
    record.userId = user.id;

    //save record
    await addRecordUseCase.execute(record);
  } catch (error) {
    throw new AppError("Process result failure", 400);
  }

  return response.status(200).json({ result, balance });
}
