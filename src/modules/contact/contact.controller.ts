import { BadRequestError } from "@errors/app.errors";
import { ContactsControllerContract } from "./types/contact.contracts";
import { ContactsService } from "./contact.service";

export const ContactsController: ContactsControllerContract = {
    getAll: async function (req, res, next) {
        try {
            const contacts = await ContactsService.getAll(res.locals.userId);
            res.status(200).json(contacts);
        } catch (error) {
            next(error);
        }
    },

    getContactById: async function (req, res, next) {
        try {
            const contactId = req.params.id;
            if (!contactId) {
                throw new BadRequestError("ID контакта обязателен");
            }

            const contact = await ContactsService.getContactById(
                Number(contactId), 
                res.locals.userId
            );
            res.status(200).json(contact);
        } catch (error) {
            next(error);
        }
    },

    create: async function (req, res, next) {
        try {
            const { localName, contactUserId } = req.body;
            
            const avatarPath = req.file ? req.file.path : res.locals.user.avatar;

            const contact = await ContactsService.create({
                localName,
                contactUserId: Number(contactUserId),
                ownerId: res.locals.userId,
                avatar: avatarPath
            });

            res.status(201).json(contact);
        } catch (error) {
            next(error);
        }
    },

    searchUser: async function (req, res, next) {
        try {
            const { username } = req.params;
            const user = await ContactsService.findUserByUsername(username);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
};
