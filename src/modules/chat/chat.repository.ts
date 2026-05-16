import { ChatRepositoryContract } from "./types/chat.contracts";
import { PRISMA_CLIENT } from "@config/client";
import { ChatWithParticipantInfo } from "./types/chat.types";

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
	getChatsWithParticipantInfo: function (
		ownerId: number,
	): Promise<ChatWithParticipantInfo[]> {
		return PRISMA_CLIENT.chat.findMany({
			where: {
				participants: {
					some: {
						userId: ownerId,
					},
				},
			},
			include: {
				lastMessage: true,
				participants: {
					where: {
						NOT: {
							userId: ownerId,
						},
					},
					include: {
						user: {
							select: {
								name: true,
								id: true,
								surname: true,
								avatar: true,
								contactOf: {
									where: {
										ownerId: ownerId,
									},
									select: {
										id: true,
										localName: true,
										avatar: true,
										addedAt: true,
									},
								},
							},
						},
					},
				},
			},
		});
	},
};
