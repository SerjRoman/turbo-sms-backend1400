import {
	PaginatedResponse,
	PaginationParams,
	PaginationSchema,
} from "@app-types/pagination";
import { AuthenticatedUser } from "@app-types/token";
import { NextFunction, Request, Response } from "express";
import { MessageControllerContract } from "./types/message.contracts";
import { Message } from "./types/message.types";
import { MessageService } from "./message.service";
import { getMessageSchema } from "./message.schema";

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
			const paginationParams = await PaginationSchema.validate({
				page: req.query.page,
				take: req.query.take,
			});
			const params = await getMessageSchema.validate(req.params);
			const data = await MessageService.getAllByChatId(params.chatId, {
				page: paginationParams.page,
				take: paginationParams.take,
			});
			console.log(data);
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	},
	async uploadMessageMedia(req, res, next) {
		try {
			const file = req.file;
			if (!file?.filename) {
				res.status(404).json({ message: "File is not found!" });
				return;
			}
			res.status(200).json({ media: file.filename });
		} catch (error) {
			next(error);
		}
	},
};
