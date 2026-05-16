import { type Prisma } from "../../../generated/prisma";

export type Chat = Prisma.ChatGetPayload<{}>;
export type CreateChat = Prisma.ChatUncheckedCreateInput;
export interface JoinChatPayload {
	chatId: number;
}
export interface LeaveChatPayload {
	chatId: number;
}
export type ChatWithChatParticipants = Prisma.ChatGetPayload<{
	include: {
		participants: true;
	};
}>;

export type ChatWithParticipantInfo = Prisma.ChatGetPayload<{
	include: {
		lastMessage: true;
		participants: {
			include: {
				user: {
					select: {
						id: true;
						name: true;
						surname: true;
						avatar: true;
						contactOf: {
							select: {
								id: true;
								localName: true;
								avatar: true;
								addedAt: true;
							};
						};
					};
				};
			};
		};
	};
}>;

export type CreateChatDto = {
	contactUserId: number;
	ownerId: number;
};
