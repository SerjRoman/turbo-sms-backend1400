import { NotFoundError } from "@errors/app.errors";
import { ChatRepository } from "./chat.repository";
import { ChatServiceContract } from "./types/chat.contracts";
import {
	CreateChatDto,
	Chat,
	ChatWithParticipantInfo,
} from "./types/chat.types";

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
	create: function (dto: CreateChatDto): Promise<Chat> {
		throw new Error("Function not implemented.");
	},
	getChatsWithParticipantInfo: function (
		ownerId: number,
	): Promise<ChatWithParticipantInfo[]> {
		return ChatRepository.getChatsWithParticipantInfo(ownerId);
	},
};
