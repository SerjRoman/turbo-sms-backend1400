import { Router } from "express";
import { authenticateMiddleware } from "@middlewares/authenticate.middleware";
import { ContactsController } from "./contact.controller";
import { processImageMiddleware, uploadMiddleware } from "@middlewares/upload";
import { validateMiddleware } from "@middlewares/validate.middleware";

export const ContactRouter = Router();

ContactRouter.use(authenticateMiddleware);

ContactRouter.get("/all", ContactsController.getAll);

ContactRouter.get("/:id", ContactsController.getContactById);

// ContactRouter.post(
//     "/create",
//     uploadMiddleware.single("avatar"),
//     validateMiddleware(contactCreateSchema),
//     processImageMiddleware(false, 300, 85),
//     ContactsController.create,
// );