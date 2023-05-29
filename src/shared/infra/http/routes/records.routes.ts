import Router from "express";
import { handleAuthentication } from "../middlewares/handleAuthentication";
import { ListRecordsController } from "@modules/records/useCases/listRecords/ListRecordsController";
import { DeleteRecordsController } from "@modules/records/useCases/deleteRecord/DeleteRecordController";

const recordsRoutes = Router();

const listRecordsController = new ListRecordsController();
const deleteRecordsController = new DeleteRecordsController();

recordsRoutes.get("/", handleAuthentication, listRecordsController.handle);
recordsRoutes.delete(
  "/:id",
  handleAuthentication,
  deleteRecordsController.handle
);

export { recordsRoutes };
