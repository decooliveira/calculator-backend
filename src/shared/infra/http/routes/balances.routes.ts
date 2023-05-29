import Router from "express";
import { handleAuthentication } from "../middlewares/handleAuthentication";
import { RetrieveUserBalanceController } from "@modules/balance/useCases/retrieveBalanceUseCase/RetrieveUserBalanceController";
import { UpdateUserBalanceController } from "@modules/balance/useCases/updateBalance/UpdateUserBalanceController";

const balancesRoutes = Router();

const retrieveBalanceController = new RetrieveUserBalanceController();
const updateUserBalanceController = new UpdateUserBalanceController();

balancesRoutes.get("/", handleAuthentication, retrieveBalanceController.handle);
balancesRoutes.post(
  "/",
  handleAuthentication,
  updateUserBalanceController.handle
);

export { balancesRoutes };
