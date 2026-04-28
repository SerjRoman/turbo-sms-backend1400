import { PRISMA_CLIENT } from '@config/client';
import { ContactsRepositoryContract } from './types/contact.contracts';
import { InternalServerError, NotFoundError, ConflictError } from '@errors/app.errors';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PrismaErrorCodes } from '@app-types/error-codes';
import type { Contact, CreationDTO } from './types/contact.types';


export const ContactRepository: ContactsRepositoryContract = {
    async findAllByOwner(ownerId: number): Promise<Contact[]> {
        try {
            return await PRISMA_CLIENT.contact.findMany({
                where: { ownerId },
                include: {
                    contactUser: {
                        select: {
                            username: true,
                            avatar: true,
                        },
                    },
                },
            });
        } catch (error) {
            throw new InternalServerError('Unknown error');
        }
    },

    async findById(id: number, ownerId: number): Promise<Contact | null> {
        try {
            const contact = await PRISMA_CLIENT.contact.findUnique({
                where: { id },
                include: {
                    contactUser: {
                        select: {
                            username: true,
                            avatar: true,
                        },
                    },
                },
            });

            if (!contact || contact.ownerId !== ownerId) {
                return null;
            }

            return contact;
        } catch (error) {
            throw new InternalServerError('Unknown error');
        }
    },

    async create(data: CreationDTO): Promise<Contact> {
        try {
            return await PRISMA_CLIENT.contact.create({
                data,
                include: {
                    contactUser: {
                        select: {
                            username: true,
                            avatar: true,
                        },
                    },
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === PrismaErrorCodes.UNIQUE) {
                    throw new ConflictError('Contact');
                }
                throw new InternalServerError();
            }
            if (error instanceof Error) {
                throw new InternalServerError(error.message);
            }
            throw new InternalServerError();
        }
    },
};
