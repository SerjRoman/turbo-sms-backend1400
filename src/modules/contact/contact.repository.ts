import { PRISMA_CLIENT } from "@config/client";
import { ContactsRepositoryContract } from "./types/contact.contracts";
import { InternalServerError } from "@errors/app.errors";


export const ContactRepository: ContactRepositoryContract = {
    async findAll(ownerId: number) {
        try {
            return await PRISMA_CLIENT.contact.findMany({
                where: { contactUserId: ownerId },
            });
        } catch (error) {
            throw new InternalServerError("unknown error");
        }
    },

    async findById(id: number) {
        return await PRISMA_CLIENT.contact.findUnique({
            where: { id },
            include: {
                contactUser: {
                    select: {
                        id: true,
                        username: true,
                        lastSeenAt: true,
                    }
                }
            }
        });
    },
}