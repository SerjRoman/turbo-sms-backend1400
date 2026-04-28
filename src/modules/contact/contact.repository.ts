import { PRISMA_CLIENT } from "@config/client";
import { ContactsRepositoryContract } from "./types/contact.contracts";
import { CreateContactPayload } from "./types/contact.types";
import { ConflictError } from "@errors/app.errors";

export const contactRepository: ContactsRepositoryContract = {
    async findAllByOwner(ownerId: number) {
        return await PRISMA_CLIENT.contact.findMany({
            where: { ownerId }
        });
    },

    async findById(id: number) {
        return await PRISMA_CLIENT.contact.findUnique({
            where: { id },
            include: {
                contactUser: {
                    select: {
                        username: true,
                        avatar: true
                    }
                }
            }
        });
    },

    async findUserByUsername(username: string) {
        return await PRISMA_CLIENT.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                avatar: true
            }
        });
    },

    async create(data: CreateContactPayload) {
        try {
            return await PRISMA_CLIENT.contact.create({
                data: {
                    localName: data.localName,
                    avatar: data.avatar,
                    contactUserId: data.contactUserId,
                    ownerId: data.ownerId
                }
            });
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new ConflictError("Этот контакт уже существует в вашем списке");
            }
            throw error;
        }
    }
};
