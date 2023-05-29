import Router from "express";
import { PerformOperationsController } from "@modules/operations/useCases/performOperations/PerformOperationsController";
import { handleAuthentication } from "../middlewares/handleAuthentication";
import { handleOperationResponse } from "../middlewares/handleOperationResponse";
import { handleBalance } from "../middlewares/handleBalance";

const mathOperationsRoutes = Router();

const performOperationsController = new PerformOperationsController();

mathOperationsRoutes.post(
  "/",
  handleAuthentication,
  handleBalance,
  performOperationsController.handle,
  handleOperationResponse
);

export { mathOperationsRoutes };
