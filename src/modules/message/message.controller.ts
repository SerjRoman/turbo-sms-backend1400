import { PaginatedResponse, PaginationParams } from "@app-types/pagination";
import { AuthenticatedUser } from "@app-types/token";
import { NextFunction, Request, Response } from "express";
import { MessageControllerContract } from "./types/message.contracts";
import { Message } from "./types/message.types";
import { MessageService } from "./message.service";

export const MessageController: MessageControllerContract = {
	getAllByChatId: async function (
		req: Request<
			{ chatId: number },
			PaginatedResponse<Message>,
			object,
			PaginationParams,
			AuthenticatedUser
		>,
		res: Response<PaginatedResponse<Message>, AuthenticatedUser>,
		next: NextFunction,
	): Promise<void> {
		try {
			res.status(200).json(
				await MessageService.getAllByChatId(req.params.chatId, {
					page: req.query.page,
					take: req.query.take,
				}),
			);
		} catch (error) {
			next(error);
		}
	},
};
