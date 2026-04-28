import { ContactRepository } from "./contact.repository";
import { ContactServiceContract } from "./types/contact.contract";
import { NotFoundError } from "../../errors/app.errors";
import { CreateContact } from "./types/contact.types";

export const ContactService: ContactServiceContract = {
    async findAll(ownerId: number){
        return await ContactRepository.findAll(ownerId);
    },

    async findById(id: number, ownerId: number){
        const contact = await ContactRepository.findById(id);

        if (!contact || contact.contactOwnerId !== ownerId){
            throw new NotFoundError("Contact not found");
        }

        return contact;
    },

    async create(data: CreateContact){
        return await ContactRepository.create(data);
    }
};