import type { UserRepository as RepoContract } from "./types/user.contracts";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { User } from "./types/user.types";
import { PrismaErrorCodes } from "@app-types/error-codes";
import { InternalServerError, NotFoundError } from "@errors/app.errors";
import { PRISMA_CLIENT } from "@config/client";

export const UserRepository: RepoContract = {
	async findByEmail(email) {
		try {
			const user = await PRISMA_CLIENT.user.findUnique({
				where: { email },
				omit: { password: true },
			});
			return user;
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
	async findByUsername(username) {
		try {
			const user = await PRISMA_CLIENT.user.findUnique({
				where: { username },
				omit: { password: true },
			});
			return user;
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
	async findByIdWithPassword(id) {
		try {
			const user = PRISMA_CLIENT.user.findUnique({
				where: { id },
			});
			return user;
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
	async create(data) {
		try {
			const user = await PRISMA_CLIENT.user.create({
				data,
			});
			return user;
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
	findById: function (id: number): Promise<User | null> {
		try {
			const user = PRISMA_CLIENT.user.findUnique({
				where: { id },
				omit: {
					password: true,
				},
			});
			return user;
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
};
