import type { NextFunction, Request, Response } from "express";
import {
	ContactEntity,
	ContactWithUser,
	CreateContactDto,
} from "./contact.types";
import { User } from "src/modules/user/types/user.types";

export interface ContactsControllerContract {
	getAll: (
		req: Request,
		res: Response<ContactEntity[]>,
		next: NextFunction,
	) => void;

	getContactById: (
		req: Request<{ id: string }>,
		res: Response<ContactWithUser>,
		next: NextFunction,
	) => void;

	create: (
		req: Request,
		res: Response<ContactEntity>,
		next: NextFunction,
	) => void;

	findUserByUsername: (
		req: Request<{ username: string }>,
		res: Response<any>,
		next: NextFunction,
	) => void;
}
export interface ContactsServiceContract {
	getAll: (userId: number) => Promise<ContactEntity[]>;

	getContactById: (id: number, ownerId: number) => Promise<ContactWithUser>;

	create: (data: CreateContactDto) => Promise<ContactEntity>;

	findUserByUsername: (username: string) => Promise<any>;
}
export interface ContactsRepositoryContract {
	findAllByOwner(ownerId: number): Promise<ContactEntity[]>;

	findById(id: number): Promise<ContactWithUser | null>;

	findUserByUsername(username: string): Promise<User | null>;

	create: (data: any) => Promise<ContactEntity>;
}
