import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { handleCredentials } from "../middlewares/handleCredentials";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post(
  "/",
  handleCredentials,
  authenticateUserController.handle
);

export { authenticateRoutes };
