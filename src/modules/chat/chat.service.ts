import { ConflictError, NotFoundError } from "@errors/app.errors";
import { ChatRepository } from "./chat.repository";
import { ChatServiceContract } from "./types/chat.contracts";
import {
	CreateChatDto,
	Chat,
	ChatWithParticipantInfo,
} from "./types/chat.types";
import { ContactRepository } from "../contact/contact.repository";

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
	create: async function (dto: CreateChatDto): Promise<Chat> {
		const contact = await ContactRepository.findByUsersWithRelations(
			dto.ownerId,
			dto.contactUserId,
		);
		if (!contact) {
			throw new NotFoundError("Contact");
		}
		const chatByParticipants = await ChatRepository.getChatByUsers(
			dto.ownerId,
			dto.contactUserId,
		);
		if (chatByParticipants) {
			throw new ConflictError(
				"Chat with these participants already exists",
			);
		}
		return await ChatRepository.create({
			participants: {
				createMany: {
					data: [
						{ userId: dto.ownerId },
						{ userId: dto.contactUserId },
					],
				},
			},
		});
	},
	getChatsWithParticipantInfo: function (
		ownerId: number,
	): Promise<ChatWithParticipantInfo[]> {
		return ChatRepository.getChatsWithParticipantInfo(ownerId);
	},
};
