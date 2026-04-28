import { ContactsServiceContract } from "./types/contact.contracts";
import { contactRepository } from './contact.repository';
import { NotFoundError } from "@errors/app.errors";

export const ContactsService: ContactsServiceContract = {
    async getAll(userId: number) {
        const contacts = await contactRepository.findAllByOwner(userId);
        return contacts;
    },

    async getContactById(id: number, ownerId: number) {
        const contact = await contactRepository.findById(id);

        if (!contact || contact.ownerId !== ownerId) {
            throw new NotFoundError('Контакт не найден');
        }

        return contact;
    },

    async create(data) {
        return await contactRepository.create(data);
    },

    async findUserByUsername(username: string) {
        const user = await contactRepository.findUserByUsername(username);
        if (!user) {
            throw new NotFoundError('Пользователь не найден');
        }
        return user;
    }
};
