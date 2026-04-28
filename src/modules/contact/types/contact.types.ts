import { Prisma } from "src/generated/prisma";

export type ContactEntity = Contact;

export type CreateContact = Prisma.ContactUncheckedCreateInput 

export type ContactWithUser = Prisma.ContactGetPayload<{
	include: {
		contactUser: {
			omit: {
				password: true;
			};
		};
	};
}>;

export type Contact = Prisma.ContactGetPayload<{}>;
