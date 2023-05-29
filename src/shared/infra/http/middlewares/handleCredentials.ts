import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { Validator } from "@utils/Validator";

export async function handleCredentials(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { username, password } = request.body;

  const credentialsValid = Validator.validateCredentials({
    username,
    password,
  });

  if (!credentialsValid) {
    throw new AppError("Please provide username(email) and password!");
  }
  next();
}
