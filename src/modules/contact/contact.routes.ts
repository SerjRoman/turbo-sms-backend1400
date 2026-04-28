import { Router } from "express";
import { authenticateMiddleware } from "@middlewares/authenticate.middleware";
import { ContactsController } from "./contact.controller";

export const ContactRouter = Router();

ContactRouter.get("/all", authenticateMiddleware, ContactsController.getAll);

ContactRouter.get(
	"/:id",
	authenticateMiddleware,
	ContactsController.getContactById,
);

ContactRouter.post(
	"/create",
	authenticateMiddleware,
	ContactsController.create,
);

ContactRouter.get(
	"/user/:username",
	authenticateMiddleware,
	ContactsController.findUserByUsername,
);
