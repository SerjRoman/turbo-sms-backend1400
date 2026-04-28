import { Router } from "express";
import { authenticateMiddleware } from "@middlewares/authenticate.middleware";
import { ContactsController } from "./contact.controller";
import { validateMiddleware } from "@middlewares/validate.middleware";
import { contactCreateSchema } from "./contact.schema";

export const ContactRouter = Router();

ContactRouter.use(authenticateMiddleware);

ContactRouter.get('/all', ContactsController.getAll);

ContactRouter.get('/search/:username', ContactsController.searchUser);

ContactRouter.get('/:id', ContactsController.getContactById);

ContactRouter.post(
    '/create',
    validateMiddleware(contactCreateSchema),
    ContactsController.create
);