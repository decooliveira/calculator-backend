import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { Router } from "express";
import { handleCredentials } from "../middlewares/handleCredentials";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", handleCredentials, createUserController.handle);

export { usersRoutes };
