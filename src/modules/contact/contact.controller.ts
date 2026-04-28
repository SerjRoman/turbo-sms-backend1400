import { BadRequestError, ValidationError } from "@errors/app.errors";
import type { ContactsControllerContract } from "./types/contact.contracts";
import { ContactsService } from "./contact.service";

// I need to change smth to do dit add
export const ContactsController: ContactsControllerContract = {
    getAll: async function (req, res, next) {
		try {
			
            const contacts = await ContactsService.getAll(res.locals.userId);
            res.status(200).json(contacts)

		} catch (error) {
			next(error)
		}
	},
	getContactById: async function (req, res, next){
	    try {
	    	const contact = await ContactsService.getContactById(Number(req.body), res.locals.userId)
	    	res.status(200).json(contact)
	    } catch (error) {
	    	next(error)
	    }
	},
    getContactByUsername: async function (req, res, next) {
        try {
            const { username } = req.body
            const contact = await ContactsService.getContactByUsername(username, res.locals.userId)
            res.status(200).json(contact)
        } catch(error) {
            next(error)
        }
    },
	create: async function(req, res, next){
        try{
            const { avatar } = req.body
            if (!avatar) {
                throw new BadRequestError
            }
            const contact = await ContactsService.create(req.body, res.locals.userId)
            res.status(200).json(contact)
        } catch(error) {
            next(error)
        }
    }
}

