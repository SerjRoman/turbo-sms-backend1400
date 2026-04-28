import { PRISMA_CLIENT } from "@config/client";
import { ContactsRepositoryContract } from "./types/contact.contracts";
import { PrismaErrorCodes } from "@app-types/error-codes";
import { NotFoundError, InternalServerError } from "@errors/app.errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";


export const contactRepository:ContactsRepositoryContract = {
    async findAllByOwner(ownerId){
        try{
            return PRISMA_CLIENT.contact.findMany({
                where:{ownerId}
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case PrismaErrorCodes.NOT_EXIST:
                        throw new NotFoundError("User");
                    default:
                        throw new InternalServerError();
                }
            }
            if (error instanceof Error) {
                throw new InternalServerError(error.message);
            }
            throw new InternalServerError();
        }
            
    },
    async findById(id, ownerId){
        try {
            return await PRISMA_CLIENT.contact.findUnique({
                where:{id, ownerId},
                include:{
                    contactUser:{
                        select:{
                            id:true,
                            username:true,
                            avatar:true
                        }
                    }
                }
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case PrismaErrorCodes.NOT_EXIST:
                        throw new NotFoundError("User");
                    default:
                        throw new InternalServerError();
                }
            }
            if (error instanceof Error) {
                throw new InternalServerError(error.message);
            }
            throw new InternalServerError();
        }
    },
    async findUserByUsername(username, ownerId){
        try {
            return await PRISMA_CLIENT.contact.findUnique({
                where:{localName: username, ownerId},
                include:{
                    contactUser:{
                        select:{
                            id:true,
                            username:true,
                            avatar:true
                        }
                    }
                }
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case PrismaErrorCodes.NOT_EXIST:
                        throw new NotFoundError("User");
                    default:
                        throw new InternalServerError();
                }
            }
            if (error instanceof Error) {
                throw new InternalServerError(error.message);
            }
            throw new InternalServerError();
        }
    },
    
    async create(data, ownerId) {
        return await PRISMA_CLIENT.contact.create({
            data: {
                localName: data.localName,
                avatar: data.avatar,
                contactUserId: data.contactUserId,
                ownerId: ownerId
            }
        });
    },
    
}
