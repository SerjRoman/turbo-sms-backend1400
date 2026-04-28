import { type Prisma } from "../../../generated/prisma";

export type Contact = Prisma.ContactGetPayload<{}>

export interface CreateContactDto {
    localName: string
    avatar?: string | undefined
    contactUserId: number
}

export interface CreateContact {
    localName: string
    avatar: string
    contactUserId: number
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