import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteRecordsUseCase } from "./DeleteRecordUseCase";

class DeleteRecordsController {
  async handle(request: Request, response: Response) {
    const recordId = request.params.id;
    const deleteRecordsUseCase = container.resolve(DeleteRecordsUseCase);
    await deleteRecordsUseCase.execute(recordId);

    return response.status(200).send();
  }
}

export { DeleteRecordsController };
