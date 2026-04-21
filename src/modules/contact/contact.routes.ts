import { Router } from "express";
import { authenticateMiddleware } from "@middlewares/authenticate.middleware";
import { ContactsController } from "./contact.controller";


export const ContactRouter = Router();

ContactRouter.get(
	'/all',
    ContactsController.getAll
);
ContactRouter.get(
    '',
    ContactsController.getContactById
);
ContactRouter.post(
    '/create',
    ContactsController.create
);
