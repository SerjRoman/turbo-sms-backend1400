import { PrismaClient, Prisma } from "@prisma/client";
import { CreateContact } from "./types/contact.types";
import { ContactRepositoryContract } from "./types/contact.contract";
import { ConflictError, InternalServerError, ValidationError } from "../../errors/app.errors";

const prisma = new PrismaClient();

export const ContactRepository: ContactRepositoryContract = {
    async findAll(ownerId: number) {
        try {
            return await prisma.contact.findMany({
                where: { contactOwnerId: ownerId },
            });
        } catch (error) {
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    },

    async findById(id: number) {
        return await prisma.contact.findUnique({
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

    async create(data: CreateContact){
        try {
            const createContact = await prisma.contact.create({ data });
            return createContact;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ConflictError("CONTACT_ALREADY_EXISTS");
                }
            }
            throw new InternalServerError("UNHANDLED_DB_EXCEPTION");
        }
    }
};