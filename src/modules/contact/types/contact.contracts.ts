import type { NextFunction, Request, Response } from "express";
import { Contact, ContactWithUser, CreateContact } from "./contact.types";
import { AuthenticatedUser } from "@app-types/token";
import { User } from "src/modules/user/types/user.types";

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
	getByUsername: (
		req: Request<
			{ username: string },
			User,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<User, AuthenticatedUser>,
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
	findUserByUsername: (username: string) => Promise<User>;
	create: (data: CreateContact, userId: number) => Promise<Contact>;
}

export interface ContactsRepositoryContract {
	findAllByOwner: (ownerId: number) => Promise<Contact[]>;
	findById: (id: number, ownerId: number) => Promise<ContactWithUser>;
	findUserByUsername: (username: string) => Promise<User>;
	create: (data: CreateContact) => Promise<Contact>;
}
