import { ContactsServiceContract } from "./types/contact.contracts";
import { contactRepository } from './contact.repository'

export const ContactsService: ContactsServiceContract = {
    async getAll(userId) {
        const contacts = await contactRepository.findAllByOwner(userId)
        if (!Array.isArray(contacts)){
            throw Error('napishite potom')
        }
        return contacts
    },
    async getContactById(id, ownerId) {
        const contract = await contactRepository.findById(id , own);

     if (!contract) {
      throw new Error('Contact not found');
    }

    return contract;
    },


   async create(localName) {
        const contact = await contactRepository.create({
            localName: localName
        });

        return contact;
   }
}
