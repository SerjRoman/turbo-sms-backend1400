import type { ContactsControllerContract } from './types/contact.contracts';
import { ContactsService } from './contact.service';
import { BadRequestError } from '@errors/app.errors';
import type { CreateContactServiceDto } from './types/contact.types';
import { UserRepository } from '../user/user.repository';



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
            const id = +req.params.id;

            if (!id) {
                throw new BadRequestError('ID is required');
            }

            const contact = await ContactsService.getContactById(id, res.locals.userId);
            res.json(contact);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const { localName, contactUserId } = req.body;
            const avatar = req.file?.filename || null;

            if (!localName) {
                throw new BadRequestError('localName is required');
            }

            if (!contactUserId) {
                throw new BadRequestError('contactUserId is required');
            }

            const contactUserIdNumber = +contactUserId;

            if (isNaN(contactUserIdNumber)) {
                throw new BadRequestError('contactUserId must be a number');
            }

            let finalAvatar = avatar;

            if (!finalAvatar) {
                const user = await UserRepository.findById(contactUserIdNumber);
                if (user) {
                    finalAvatar = user.avatar || null;
                }
            }

            const dto: CreateContactServiceDto = {
                localName,
                avatar: finalAvatar,
                contactUserId: contactUserIdNumber,
                ownerId: res.locals.userId,
            };

            const contact = await ContactsService.create(dto);
            res.status(201).json(contact);
        } catch (error) {
            next(error);
        }
    },
};
