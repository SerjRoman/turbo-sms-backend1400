import { MessageServiceContract } from "./types/message.contracts";
import { MessageRepository } from "./message.repository";

export const MessageService: MessageServiceContract = {
	async getAllByChatId(chatId, pagination) {
		return await MessageRepository.getAllByChatId(chatId, pagination);
	},
	sendMessage(dto) {
		return MessageRepository.create({
			...dto,
			chatAsLastMessageId: dto.chatId,
		});
	},
};
