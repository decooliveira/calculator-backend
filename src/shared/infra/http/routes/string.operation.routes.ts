import Router from "express";
import { PerformOperationsController } from "@modules/operations/useCases/performOperations/PerformOperationsController";
import { RandomStringGenerationController } from "@modules/operations/useCases/generateRandomString/RandomStringGenerationController";
import { handleAuthentication } from "../middlewares/handleAuthentication";
import { handleOperationResponse } from "../middlewares/handleOperationResponse";
import { handleBalance } from "../middlewares/handleBalance";

const stringOperationsRoutes = Router();

const randomStringGenerationController = new RandomStringGenerationController();

stringOperationsRoutes.post(
  "/",
  handleAuthentication,
  handleBalance,
  randomStringGenerationController.handle,
  handleOperationResponse
);

export { stringOperationsRoutes };
