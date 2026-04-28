import type { ContactsControllerContract } from "./types/contact.contracts";

import { ContactsService } from "./contact.service";
import { BadRequestError } from "@errors/app.errors";

export const ContactsController: ContactsControllerContract = {
    async getAll(req, res, next) {
        try {
            let contacts = await ContactsService.getAll(res.locals.userId)
            res.json(contacts);
        } catch (error) {
            next(error)
        }
    },
    async getContactById(req, res, next) {
        try {
            let id = +req.params.id;

            if (!id) {
                throw new BadRequestError("ID must be at least");
            }
            
            const contact = await ContactsService.getContactById(
                id,
                res.locals.userId
            );
            res.json(contact);
        } catch (error) {
            next(error)
        }
    },
    async create(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    },
};
