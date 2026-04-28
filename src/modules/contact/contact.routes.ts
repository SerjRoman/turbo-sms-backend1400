import { Router } from "express";
import { authenticateMiddleware } from "@middlewares/authenticate.middleware";
import { ContactsController } from "./contact.controller";


export const ContactRouter = Router();

ContactRouter.get(
	'/all',
    authenticateMiddleware,
    ContactsController.getAll
);
ContactRouter.get(
    '',
    authenticateMiddleware,
    ContactsController.getContactById
);
ContactRouter.get(
    '/get-by-username',
    authenticateMiddleware,
    ContactsController.getContactByUsername
)
ContactRouter.post(
    '/create',
    authenticateMiddleware,
    ContactsController.create
);
