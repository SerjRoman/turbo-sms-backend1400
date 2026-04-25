import type { NextFunction, Request, Response } from "express";
import type { UserController as UserControllerContract } from "./types/user.contracts";
import type {
	TokenDTO,
	LoginCredentials,
	RegisterCredentials,
	User,
} from "./types/user.types";
import { UserService } from "./user.service";
import { AuthenticatedUser } from "@app-types/token";
import { BadRequestError } from "@errors/app.errors";

export const UserController: UserControllerContract = {
	login: async function (
		req: Request<object, TokenDTO, LoginCredentials>,
		res: Response<TokenDTO>,
		next,
	) {
		try {
			const token = await UserService.login(req.body);
			res.status(200).json(token);
		} catch (error) {
			next(error);
		}
	},
	register: async function (
		req: Request<object, TokenDTO, RegisterCredentials>,
		res: Response<TokenDTO>,
		next,
	) {
		try {
			console.log(req.file);
			const token = await UserService.register({
				...req.body,
				avatar: req.file?.filename,
			});
			res.status(200).json(token);
		} catch (error) {
			next(error);
		}
	},
	me: async function (_, res, next) {
		try {
			const token = await UserService.me({ userId: res.locals.userId });
			res.status(200).json(token);
		} catch (error) {
			next(error);
		}
	},
	findByUsername: async function (
		req: Request<
			{ username: string },
			object,
			User,
			object,
			AuthenticatedUser
		>,
		res: Response<User, AuthenticatedUser>,
		next: NextFunction,
	): Promise<void> {
		try {
			if (!req.params.username)
				throw new BadRequestError("Username is not provided");
			res.status(200).json(
				await UserService.findByUsername({
					username: req.params.username,
				}),
			);
		} catch (error) {
			next(error);
		}
	},
};
