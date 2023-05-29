import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { ListRecordsUseCase } from "./ListRecordsUseCase";
import { IRecordFilterParams } from "@shared/container/interfaces/IRecordFilterParams";
import { IPageOptions } from "@shared/container/interfaces/IPageOptions";
import { ISortingOptions } from "@shared/container/interfaces/ISortingOptions";
import { OrderDirection } from "@shared/types/OrderDirections";
import { RecordFieldsParser } from "@shared/types/RecordSortingFields";

class ListRecordsController {
  constructor() {}

  async handle(request: Request, response: Response) {
    //pagination options
    const pageSize = Number(request.query.pageSize) || 10;
    const page = Number(request.query.page) || 1;
    const userId = request.user.id;
    //filters
    const includeDeleted: boolean = request.query.includeDeleted === "true";
    const operation: string = request.query.operation as string;
    const sortBy: string = RecordFieldsParser.parse(
      String(request.query.sortBy)
    );
    const direction = OrderDirection.parse(String(request.query.direction));

    const pageOptions: IPageOptions = { page, pageSize, userId };
    const filterParams: IRecordFilterParams = { includeDeleted, operation };
    const sortingOptions: ISortingOptions = { sortBy, direction };
    const listRecordsUseCase = container.resolve(ListRecordsUseCase);

    const result = await listRecordsUseCase.execute(
      pageOptions,
      filterParams,
      sortingOptions
    );

    return response.status(200).json({ result });
  }
}

export { ListRecordsController };
