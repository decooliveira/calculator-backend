import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { handleCredentials } from "../middlewares/handleCredentials";
import { LogoutController } from "@modules/accounts/useCases/invalidateUserToken/LogoutController";
import { handleAuthentication } from "../middlewares/handleAuthentication";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const logoutController = new LogoutController();

authenticateRoutes.post(
  "/",
  handleCredentials,
  authenticateUserController.handle
);

authenticateRoutes.post(
  "/logout",
  handleAuthentication,
  logoutController.handle
);

export { authenticateRoutes };
