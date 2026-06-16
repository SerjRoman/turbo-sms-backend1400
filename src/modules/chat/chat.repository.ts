import { ChatRepositoryContract } from "./types/chat.contracts";
import { PRISMA_CLIENT } from "@config/client";
import { Chat, ChatWithParticipantInfo, CreateChat } from "./types/chat.types";

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
	getChatByUsers: function (p1: number, p2: number): Promise<Chat | null> {
		return PRISMA_CLIENT.chat.findFirst({
			where: {
				AND: [
					{
						participants: {
							some: { userId: p1 },
						},
					},
					{
						participants: {
							some: { userId: p2 },
						},
					},
				],
			},
		});
	},
	create: function (data: CreateChat): Promise<Chat> {
		return PRISMA_CLIENT.chat.create({ data });
	},
	getChatWithParticipantInfo: function (
		chatId: number,
		ownerId: number,
	): Promise<ChatWithParticipantInfo | null> {
		return PRISMA_CLIENT.chat.findUnique({
			where: {
				id: chatId,
			},
			include: {
				lastMessage: true,
				participants: {
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
	getContactInfoByUserAndOwnerIds: async (userId, ownerId) => {
		return await PRISMA_CLIENT.contact.findFirst({
			where: {
				contactUserId: userId,
				ownerId
			}
		})
	}
};
