import type { NextFunction, Request, Response } from "express";
import { Contact, ContactWithUser, CreateContact, CreateContactServiceDto } from "./contact.types";
import { AuthenticatedUser } from "@app-types/token";

export interface ContactsControllerContract {
	getAll: (
		req: Request<object, Contact[], object, object, AuthenticatedUser>,
		res: Response<Contact[], AuthenticatedUser>,
		next: NextFunction,
	) => void;
	getById: (
		req: Request<
			{ id: string },
			ContactWithUser,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ContactWithUser, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	create: (
		req: Request<object, CreateContact, CreateContact, object, AuthenticatedUser>,
		res: Response<Contact, AuthenticatedUser>,
		next: NextFunction,
	) => void;
}

export interface ContactsServiceContract {
	getAll: (userId: number) => Promise<Contact[]>;
	getById: (id: number, ownerId: number) => Promise<ContactWithUser>;
	create: (data: CreateContactServiceDto, userId: number) => Promise<Contact>;
}

export interface ContactsRepositoryContract {
	findAllByOwner: (ownerId: number) => Promise<Contact[]>;
	findById: (id: number, ownerId: number) => Promise<ContactWithUser>;
	create: (data: CreateContact) => Promise<Contact>;
}
