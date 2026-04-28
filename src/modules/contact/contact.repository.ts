import { PRISMA_CLIENT } from "@config/client";
import { ContactsRepositoryContract } from "./types/contact.contracts";
import { InternalServerError, ConflictError, NotFoundError } from "@errors/app.errors";
import { Prisma } from "../../generated/prisma";

export const ContactRepository: ContactsRepositoryContract = {
    async findAllByOwner(ownerId) {
        return await PRISMA_CLIENT.contact.findMany({
            where: { ownerId },
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

    async findById(id, ownerId) {
        return await PRISMA_CLIENT.contact.findFirst({
            where: { id, ownerId },
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

    async create(data: any) {
        try {
            return await PRISMA_CLIENT.contact.create({
                data: {
                    localName: data.localName,
                    avatar: data.avatar,
                    contactUserId: Number(data.contactUserId),
                    ownerId: Number(data.ownerId),
                },
                include: {
                    contactUser: {
                        select: {
                            username: true,
                            avatar: true,
                        },
                    },
                },
            });
        } catch (error: any) {
            console.error(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("This contact already exists");
                }
                if (error.code === 'P2003') {
                    throw new NotFoundError("Target user for contact not found");
                }
            }
            throw new InternalServerError("Error creating contact");
        }
    }
};