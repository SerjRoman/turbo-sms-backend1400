import { type Prisma } from "../../../generated/prisma";
import { type InferType } from "yup";
import { loginSchema, regSchema } from "../user.schema";

export type User = Prisma.UserGetPayload<{
	omit: {
		password: true;
	};
}>;

export type CreateUserPayload = Prisma.UserUncheckedCreateInput;

export type UserWithPassword = Prisma.UserGetPayload<{}>;
// DTO -> Data Transfer Object

export type RegisterDto = {
	email: string;
	password: string;
	name: string;
	surname: string;
	username: string;
	avatar?: string | undefined;
};

export type LoginCredentials = InferType<typeof loginSchema>;
export type RegisterCredentials = InferType<typeof regSchema>;

export type MeDTO = {
	userId: number;
};
export type TokenDTO = {
	token: string;
};
export type FindUserByUsernameDto = {
	username: string;
};
