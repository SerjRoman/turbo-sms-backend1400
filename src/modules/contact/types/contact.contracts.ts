import type { NextFunction, Request, Response } from "express";
import { Contact, CreateContact, CreateContactDto } from "./contact.types";


export interface ContactsControllerContract{
    getAll: (
		req: Request<object, Contact[]>,
		res: Response<Contact[]>,
		next: NextFunction,
	) => void;
    getContactById: (
        req: Request<object, Contact, {id: number}>,
        res: Response<Contact>,
        next: NextFunction

    ) => void;
    getContactByUsername: (
        req: Request<object, Contact, {username: string}>,
        res: Response<Contact>,
        next: NextFunction
    ) => void
	create: (
        req: Request<object, CreateContactDto>,
        res: Response<Contact>,
        next: NextFunction
    ) => void;
}
export interface ContactsServiceContract{
	getAll: (userId: number) => Contact[];
	getContactById:(
		id: number,
		ownerId: number
	)=> Promise<Contact>;
    getContactByUsername: (username: string, ownerId: number) => Promise<Contact>
    create: (data: CreateContact, ownerId: number) => Promise<Contact>
}
export interface ContactsRepositoryContract{
    findAllByOwner(ownerId: number): Promise<Contact[]>
    findById: (id: number, ownerId: number) => Promise<Contact | null>;
    findUserByUsername(username:string, ownerId: number): Promise<Contact | null>
    create: (data: CreateContact, ownerId: number) => Promise<Contact>
}
