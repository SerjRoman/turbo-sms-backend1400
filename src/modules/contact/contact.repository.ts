import { PRISMA_CLIENT as Client } from "@config/client";
import { ContactsRepositoryContract } from "./types/contact.contracts";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/wasm-compiler-edge";
import { PrismaErrorCodes } from "@app-types/error-codes";
import {
	ConflictError,
	InternalServerError,
	NotFoundError,
} from "@errors/app.errors";

export const ContactRepository: ContactsRepositoryContract = {
	async findAllByOwner(ownerId) {
		return Client.contact.findMany({
			where: { ownerId },
		});
	},
	async findById(id) {
		try {
			return await Client.contact.findUniqueOrThrow({
				where: { id },
				include: {
					contactUser: {
						omit: {
							password: true,
						},
					},
				},
			});
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError(`Contact with id ${id}`);
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
	async create(data) {
		try {
			return await Client.contact.create({ data });
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.UNIQUE:
						throw new ConflictError(
							`Contact with contact such id (${data.contactUserId}) & owner id (${data.ownerId}) already exists`,
						);
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
};
