import type { NextFunction, Request, Response } from "express";
import { Contact, CreateContactDto, CreationDTO, ShortContact, userIdLocals } from "./contact.types";


export interface ContactsControllerContract{
    getAll: (
		req: Request<object, Contact[]>,
		res: Response<Contact[], userIdLocals>,
		next: NextFunction,
	) => void;
    getContactById: (
        req: Request<{id: string}, ShortContact>,
        res: Response<ShortContact, userIdLocals>,
        next: NextFunction
    ) => void;
	create: (
        req: Request<object, CreationDTO>,
        res: Response<Contact, userIdLocals>,
        next: NextFunction
     ) => void;
}

export interface ContactsServiceContract{
	getAll: (userId: number) => Promise<Contact[]>;

	getContactById:(
		id: number,
		ownerId: number
	)=> Promise<Contact>;

    create: (data: CreateContactDto) => Promise<Contact>;
}
export interface ContactsRepositoryContract{
    findAllByOwner: ( ownerId: number ) => Promise<Contact[]>
    findById: (id: number, ownerId: number) => Promise<Contact | null>;
    create: (data: CreateContactDto) => Promise<Contact>;
}
