import { NotFoundError } from "@errors/app.errors";
import { ChatRepository } from "./chat.repository";
import { ChatServiceContract } from "./types/chat.contracts";

export const ChatService: ChatServiceContract = {
	isChatParticipant: async function (chatId, userId) {
		const chat = await this.getChatParticipants(chatId);
		return chat.participants.some(
			(participant) => participant.userId === userId,
		);
	},
	getChatParticipants: async function (chatId) {
		const chat = await ChatRepository.getChatParticipants(chatId);
		if (!chat) {
			throw new NotFoundError("User");
		}
		return chat;
	},
};
