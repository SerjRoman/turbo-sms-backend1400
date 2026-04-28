import { Prisma } from "../../../generated/prisma";

export type Contact = Prisma.ContactGetPayload<{}>;

export type ShortContact = Prisma.ContactGetPayload<{
	select: { localName: true; avatar: true };
}>;

export interface CreateContactServiceDto {
	localName: string;
	avatar: string | null;
	contactUserId: number;
	ownerId: number;
}

export type CreateContact = Prisma.ContactUncheckedCreateInput;

export type ContactWithUser = Prisma.ContactGetPayload<{
	include: {
		contactUser: {
			omit: {
				password: true;
			};
		};
	};
}>;
