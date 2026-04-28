import { ContactsServiceContract } from "./types/contact.contracts";
import { contactRepository } from './contact.repository'

export const ContactsService: ContactsServiceContract = {
    async getAll(userId) {
        const contacts = await contactRepository.findAllByOwner(userId)
        if (!Array.isArray(contacts)){
            throw Error('This is not a contacts array')
        }
        return contacts
    },
    async getContactById(id, ownerId) {
        const contact = await contactRepository.findById(id, ownerId);
        if (!contact) {
            throw new Error('Contact not found');
        }
        return contact;
    },
    async getContactByUsername(username, ownerId) {
        const contact = await contactRepository.findUserByUsername(username, ownerId)
        if (!contact) {
            throw new Error('Contact not found');
        }
        return contact;
    },

    async create(data, ownerId) {
        const contact = await contactRepository.create(data, ownerId);
        return contact;
    }
}
