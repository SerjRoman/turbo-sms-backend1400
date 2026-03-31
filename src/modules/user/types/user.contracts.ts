import type { Request, Response } from "express";
import type {
	CreateUserPayload,
	LoginCredentials,
	MeDTO,
	RegisterCredentials,
	TokenDTO,
	User,
	UserWithPassword,
} from "./user.types";
import { TokenPayload } from "@types/token";

export interface UserService {
	login: (credentials: LoginCredentials) => Promise<TokenDTO>;
	register: (credentials: RegisterCredentials) => Promise<TokenDTO>;
	me: (DTO: MeDTO) => Promise<User>;
}
export interface UserRepository {
	findByEmail: (email: string) => Promise<User | null>;
	findByUsername: (username: string) => Promise<User | null>;
	findByIdWithPassword: (id: number) => Promise<UserWithPassword | null>;
	findById: (id: number) => Promise<User | null>;
	create: (data: CreateUserPayload) => Promise<User>;
}

export interface UserController {
	login: (
		req: Request<object, TokenDTO, LoginCredentials>,
		res: Response<TokenDTO>,
	) => void;
	register: (
		req: Request<object, TokenDTO, RegisterCredentials>,
		res: Response<TokenDTO>,
	) => void;
	me: (
		req: Request<object, object, object, object, TokenPayload>,
		res: Response<User, TokenPayload>,
	) => void;
}
