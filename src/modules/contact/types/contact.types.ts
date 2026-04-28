import { Contact, Prisma } from "src/generated/prisma";

export type ContactEntity = Contact;

export interface CreateContactDto {
	localName: string;
	avatar?: string;
	contactUserId: number;
	ownerId: number;
}

export type ContactWithUser = Prisma.ContactGetPayload<{
	include: {
		contactUser: {
			select: {
				username: true;
				avatar: true;
			};
		};
	};
}>;
