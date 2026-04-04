import { Router } from "express";
import { UserController } from "./user.controller";
import { validateMiddleware } from "@middlewares/validate.middleware";
import { loginSchema, regSchema } from "./user.schema";
import { authenticateMiddleware } from "@middlewares/authenticate.middleware";

export const UserRouter = Router();

UserRouter.post("login", validateMiddleware(loginSchema), UserController.login);
UserRouter.post(
	"register",
	validateMiddleware(regSchema),
	UserController.register,
);
UserRouter.get("me", authenticateMiddleware, UserController.me);
