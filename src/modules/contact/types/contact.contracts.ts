import type { NextFunction, Request, Response } from "express";
import { Contact } from "./contact.types";


export interface ContactsControllerContract{
    getAll: (
		req: Request<object, Contact[]>,
		res: Response<Contact[]>,
		next: NextFunction,
	) => void;
    getContactById: (
        req: Request<object, Contact, {id: string}>,
        res: Response<Contact>,
        next: NextFunction

    ) => void;
	create: (
        req: Request<object, { localName: string, avatar?: null, contactUserId: string }>,
        res: Response<Contact>,
        next: NextFunction
     ) => void;
     
        

}
export interface ContactsServiceContract{
	getAll: (userId: number) => Contact[];

	getContactById:(
		id: number,
		ownerId: number
	)=> Promise<Contact | null>;
    create: (localName: string) => Promise<Contact>
	
}
export interface ContactsRepositoryContract{
    findAllByOwner(ownerId: number): Promise<Contact[]>
    findById: (id: number, owner: number) => Promise<Contact | null>;
    findUserByUsername(username:string): Promise<Contact | null>
    create: (data: CreateContactPayload) => Promise<Contact>
}
