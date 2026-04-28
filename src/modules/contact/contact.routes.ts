import { Router } from 'express';
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { ContactController } from "./contact.controller";
import { createContactSchema } from "./contact.schema";

export const contactRoutes = Router();

contactRoutes.use(authenticateMiddleware);

contactRoutes.get('/getContacts', ContactController.getAll);

contactRoutes.get('/getContact/:id', ContactController.getContactById);

contactRoutes.post(
    '/createContact',
    validateMiddleware(createContactSchema),
    ContactController.createContact
);