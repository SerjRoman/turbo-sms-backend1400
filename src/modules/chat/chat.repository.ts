import { ChatRepositoryContract } from "./types/chat.contracts";
import { PRISMA_CLIENT } from "@config/client";

export const ChatRepository: ChatRepositoryContract = {
	async getChatParticipants(chatId) {
		return await PRISMA_CLIENT.chat.findUnique({
			where: {
				id: chatId,
			},
			include: {
				participants: true,
			},
		});
	},
};
