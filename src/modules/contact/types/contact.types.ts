import { Contact as PrismaContact, type Prisma } from "../../../generated/prisma";

export type ContactEntity = PrismaContact;

export interface CreateContactPayload {
    localName: string;
    avatar: string; 
    contactUserId: number;
    ownerId: number;
}

export interface ContactWithUser extends ContactEntity {
    contactUser: {
        username: string;
        avatar: string | null;
    };
}

export interface FoundUserDto {
    id: number;
    username: string;
    avatar: string | null;
}

export type Contact = Prisma.ContactGetPayload<{}>;