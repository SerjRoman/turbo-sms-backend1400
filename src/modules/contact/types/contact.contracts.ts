import type { NextFunction, Request, Response } from "express";
import { 
    Contact, 
    ContactEntity, 
    CreateContactPayload, 
    ContactWithUser, 
    FoundUserDto 
} from "./contact.types";


export interface ContactsControllerContract {
    getAll: (
        req: Request<object, Contact[]>, 
        res: Response<Contact[]>, 
        next: NextFunction
    ) => Promise<void>;

    getContactById: (
        req: Request<{ id: string }>, 
        res: Response<ContactWithUser>, 
        next: NextFunction
    ) => Promise<void>;

    create: (
        req: Request<object, any, { localName: string, contactUserId: string }>, 
        res: Response<ContactEntity>, 
        next: NextFunction
    ) => Promise<void>;

    searchUser: (
        req: Request<{ username: string }>, 
        res: Response<FoundUserDto>, 
        next: NextFunction
    ) => Promise<void>;
}

export interface ContactsServiceContract {
    getAll: (userId: number) => Promise<ContactEntity[]>;
    
    getContactById: (id: number, ownerId: number) => Promise<ContactWithUser>;
    
    create: (data: CreateContactPayload) => Promise<ContactEntity>;
    
    findUserByUsername: (username: string) => Promise<FoundUserDto>;
}

export interface ContactsRepositoryContract {
    findAllByOwner: (ownerId: number) => Promise<ContactEntity[]>;
    
    findById: (id: number) => Promise<ContactWithUser | null>;
    
    findUserByUsername: (username: string) => Promise<FoundUserDto | null>;
    
    create: (data: CreateContactPayload) => Promise<ContactEntity>;
}
