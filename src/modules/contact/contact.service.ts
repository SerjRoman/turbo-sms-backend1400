import { ContactsServiceContract } from "./types/contact.contracts";
import { ContactRepository } from './contact.repository'
import { BadRequestError } from "@errors/app.errors";

export const ContactsService: ContactsServiceContract = {

    async getAll(userId) {

        const contacts = await ContactRepository.findAllByOwner(userId)
        
        if (!Array.isArray(contacts)){
            throw new BadRequestError('pupupu')
        
        }
        return contacts
    },
    async getContactById(id, ownerId) {
        const contract = await ContactRepository.findById(id , ownerId);

        if (!contract) {
            throw new Error('Contact not found');
        }

    return contract;
}
