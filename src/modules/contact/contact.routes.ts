import { Router } from "express";
import { authenticateMiddleware } from "@middlewares/authenticate.middleware";
import { ContactsController } from "./contact.controller";
import { processImageMiddleware, uploadMiddleware } from "@middlewares/upload";
import { validateMiddleware } from "@middlewares/validate.middleware";
import { contactCreateSchema } from "./contact.schema";

export const ContactRouter = Router();

ContactRouter.get("/", authenticateMiddleware, ContactsController.getAll);

ContactRouter.get("/:id", authenticateMiddleware, ContactsController.getById);

ContactRouter.post(
	"/create",
	authenticateMiddleware,
	uploadMiddleware.single("avatar"),
    validateMiddleware(contactCreateSchema),
	processImageMiddleware(false, 500, 70),
	ContactsController.create,
);
