import { Router } from "express";
import { authenticateMiddleware } from "@middlewares/authenticate.middleware";
import { ContactsController } from "./contact.controller";
import { processImageMiddleware, uploadMiddleware } from "@middlewares/upload";

export const ContactRouter = Router();

ContactRouter.get("/", authenticateMiddleware, ContactsController.getAll);

ContactRouter.get(
	"/id/:id",
	authenticateMiddleware,
	ContactsController.getById,
);

ContactRouter.get(
	"/:username",
	authenticateMiddleware,
	ContactsController.getByUsername,
);

ContactRouter.post(
	"/create",
	authenticateMiddleware,
	uploadMiddleware.single("avatar"),
	processImageMiddleware(false, 500, 70),
	ContactsController.create,
);
