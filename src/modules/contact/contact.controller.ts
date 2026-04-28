import { ContactsControllerContract } from "./types/contact.contracts";
import { ContactsService } from "./contact.service";
import { BadRequestError } from "@errors/app.errors";

export const ContactsController: ContactsControllerContract = {
    async getAll(req, res, next) {
        try {
            const contacts = await ContactsService.getAll(res.locals.userId);
            res.json(contacts);
        } catch (error) {
            next(error);
        }
    },

    async getContactById(req, res, next) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) throw new BadRequestError("Invalid ID");

            const contact = await ContactsService.getContactById(id, res.locals.userId);
            res.json(contact);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            // console.log(req.body);
            // console.log(res.locals.userId);
            const ownerId = res.locals.userId;
            if (!ownerId) {
                return res.status(401).json();
            }
            const { localName, contactUserId } = req.body;
            const avatar = req.file ? req.file.filename : null;
        
            const contact = await ContactsService.create({
                localName,
                avatar,
                contactUserId: Number(contactUserId),
                ownerId: Number(ownerId)
            });
        
            res.status(201).json(contact);
        } catch (error) {
            next(error);
        }
    }
};