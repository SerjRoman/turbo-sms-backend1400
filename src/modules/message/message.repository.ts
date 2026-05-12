import { PRISMA_CLIENT } from "@config/client";
import { MessageRepositoryContract } from "./types/message.contracts";

export const MessageRepository: MessageRepositoryContract = {
	async create(data) {
		//
		const newMessage = await PRISMA_CLIENT.$transaction(async (tx) => {
			const message = await tx.message.create({ data });
			await tx.chat.update({
				where: { id: data.chatId },
				data: {
					lastMessageId: message.id,
				},
			});
			return message;
		});
		return newMessage;
	},
	async getAllByChatId(chatId, pagination) {
		const messages = await PRISMA_CLIENT.message.findMany({
			where: { chatId },
			take: pagination.take,
			skip: pagination.take * (pagination.page - 1),
		});
		const count = await PRISMA_CLIENT.message.count();
		return {
			data: messages,
			meta: {
				...pagination,
				totalPages: Math.ceil(count / pagination.take),
			},
		};
	},
};
//
/*
    - 200гриvень
    +200гривень ОШИИИБККАААА

*/
