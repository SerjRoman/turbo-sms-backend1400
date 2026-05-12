import { type Prisma } from "../../../generated/prisma";

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
