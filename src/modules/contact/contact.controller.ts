import { ContactControllerContract } from "./types/contact.contract";
import { ContactService } from "./contact.service";
import { BadRequestError } from "../../errors/app.errors";

export const ContactController: ContactControllerContract = {
    async getAll(req, res, next){
        try {
            const contacts = await ContactService.findAll(res.locals.id);
            res.status(200).json(contacts);
        } catch (error) {
            next(error);
        }
    },

    async getContactById(req, res, next){
        try {
            const id = Number(req.params.id);

            if (!id) {
                throw new BadRequestError("ID_REQUIRED");
            }

            const contact = await ContactService.findById(
                id,
                res.locals.id
            );

            res.status(200).json(contact);
        } catch (error) {
            next(error);
        }
    },

    async createContact(req, res, next){
        try {
            const { localName, contactUserId } = req.body.data;

            const createdContact = await ContactService.create({
                localName,
                contactUserId: Number(contactUserId),
                contactOwnerId: res.locals.id,
                avatar: req.file?.filename,
            });

            res.status(201).json(createdContact);
        } catch (error) {
            next(error);
        }
    }
};