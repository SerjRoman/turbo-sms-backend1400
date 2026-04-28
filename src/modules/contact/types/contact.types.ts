import { type Prisma } from "../../../generated/prisma";
export type ContactEntity = Contact;

export interface CreateContactDto {
    localName: string;
    avatar?: string | null;
    contactUserId: number;
    ownerId: number;
}

export interface ContactWithUser {
    id: number;
    localName: string;
    avatar?: string | null;
    ownerId: number;
    contactUser: {
        username: string;
        avatar?: string | null;
    };
    createdAt: Date;
}


export type Contact = Prisma.ContactGetPayload<{
    include: { 
        contactUser: { 
            select: { 
                username: true, 
                avatar: true 
            } 
        } 
    }
}>;

export type ShortContact = Prisma.ContactGetPayload<{
    select: { localName: true; avatar: true }
}>;

export type CreationDTO = { 
    localName: string; 
    avatar?: string | null; 
    contactUserId: string; 
};

export interface CreateContactServiceDto {
    getAll: (userId: number) => Promise<Contact[]>;
    getContactById: (id: number, ownerId: number) => Promise<Contact>;
    create: (data: CreateContactServiceDto) => Promise<Contact>;
}

export interface CreateContactRepoDto {
    findAllByOwner: (ownerId: number) => Promise<Contact[]>;
    findById: (id: number, ownerId: number) => Promise<Contact | null>;
    create: (data: CreateContactServiceDto) => Promise<Contact>;
}
export type userIdLocals = {userId: number}