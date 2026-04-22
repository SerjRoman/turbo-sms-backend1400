import {Router} from 'express'
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import {ContactController} from "./contract.controller"
import{createContactSchema} from "./contract.schema"


export const contactRoutes = Router()

contactRouter.get('/getContacts', validateMiddleware, UserController.findAll)
contactRouter.get('/getContact/:userId', validateMiddleware, UserController.findOne)
contactRouter.post('/createContact', validateMiddleware(createContactSchema), UserController.create)