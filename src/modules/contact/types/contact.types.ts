import { type Prisma } from "../../../generated/prisma";
export type ContactEntity = Contact;

export interface CreateContactDto {
    localName: string;
    avatar?: string | undefined
    contactUserId: number;
}

export interface ContactWithUser {
    id: number;
    localName: string;
    avatar: string | undefined;
    ownerId: number;
    contactUser: {
        username: string;
        avatar: string | undefined;
    };
    createdAt: Date;
}


export type Contact = Prisma.ContactGetPayload<{}>


export type ShortContact = Prisma.ContactGetPayload<{select: {localName: true, avatar: true}}>

export type CreationDTO = { localName: string, avatar?: string | null, contactUserId: string }

export interface CreateContactServiceDto {
    localName: string;
    avatar: string | null;
    contactUserId: number;
    ownerId: number;
}

export interface CreateContactRepoDto {
    localName: string;
    avatar: string | null;
    contactUserId: number;
    ownerId: number;
}
export type userIdLocals = {userId: number}