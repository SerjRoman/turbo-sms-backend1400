import { ContactsServiceContract } from "./types/contact.contracts";
import { ContactRepository } from './contact.repository';
import { NotFoundError } from "@errors/app.errors";

export const ContactsService: ContactsServiceContract = {
    async getAll(userId) {
        return await ContactRepository.findAllByOwner(userId);
    },

    async getContactById(id, ownerId) {
        const contact = await ContactRepository.findById(id, ownerId);
        if (!contact) {
            throw new NotFoundError('Contact not found');
        }
        return contact;
    },

    async create(data) {
        return await ContactRepository.create(data);
    }
};