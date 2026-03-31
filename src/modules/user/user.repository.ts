import { PrismaErrorCodes, ErrorCodes } from "types/error-codes";
import { PrismaClient } from "../../generated/prisma";
import type { UserRepository as RepoContract } from "./types/user.contracts";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { User } from "./types/user.types";

const Client = new PrismaClient();

export const UserRepository: RepoContract = {
	async findByEmail(email) {
		try {
			const user = await Client.user.findUnique({
				where: { email },
				omit: { password: true },
			});
			return user;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new Error(ErrorCodes.NOT_FOUND);
					default:
						throw new Error(ErrorCodes.UNHANDLED);
				}
			}
			if (error instanceof Error) {
				throw new Error(error.message);
			}
			throw new Error(ErrorCodes.UNHANDLED);
		}
	},
	async findByUsername(username) {
		try {
			const user = await Client.user.findUnique({
				where: { username },
				omit: { password: true },
			});
			return user;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new Error(ErrorCodes.NOT_FOUND);
					default:
						throw new Error(ErrorCodes.UNHANDLED);
				}
			}
			if (error instanceof Error) {
				throw new Error(error.message);
			}
			throw new Error(ErrorCodes.UNHANDLED);
		}
	},
	async findByIdWithPassword(id) {
		try {
			const user = Client.user.findUnique({
				where: { id },
			});
			return user;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new Error(ErrorCodes.NOT_FOUND);
					default:
						throw new Error(ErrorCodes.UNHANDLED);
				}
			}
			if (error instanceof Error) {
				throw new Error(error.message);
			}
			throw new Error(ErrorCodes.UNHANDLED);
		}
	},
	async create(data) {
		try {
			const user = await Client.user.create({
				data,
			});
			return user;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new Error(ErrorCodes.NOT_FOUND);
					case PrismaErrorCodes.UNIQUE:
						throw new Error(ErrorCodes.EXISTS);
					default:
						throw new Error("UNHANDLED");
				}
			}
			if (error instanceof Error) {
				throw new Error(error.message);
			}
			throw new Error(ErrorCodes.UNHANDLED);
		}
	},
	findById: function (id: number): Promise<User | null> {
		throw new Error("Function not implemented.");
	},
};
