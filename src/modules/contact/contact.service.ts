import { ContactsServiceContract } from './types/contact.contracts';
import { ContactRepository } from './contact.repository';
import { NotFoundError } from '@errors/app.errors';
import type { Contact, CreateContactServiceDto } from './types/contact.types';
import { UserRepository } from '../user/user.repository';



export const ContactsService: ContactsServiceContract = {
    async getAll(userId: number): Promise<Contact[]> {
        const contacts = await ContactRepository.findAllByOwner(userId);
        return contacts;
    },

    async getContactById(id: number, ownerId: number): Promise<Contact> {
        const contact = await ContactRepository.findById(id, ownerId);

        if (!contact) {
            throw new NotFoundError('Contact');
        }

        return contact;
    },

    async create(dto: CreateContactServiceDto): Promise<Contact> {
        const contact = await ContactRepository.create({
            localName: dto.localName,
            avatar: dto.avatar,
            contactUserId: dto.contactUserId,
            ownerId: dto.ownerId,
        });

        return contact;
    },
};
