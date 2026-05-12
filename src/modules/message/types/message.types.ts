import { type Prisma } from "../../../generated/prisma";

export type Message = Prisma.MessageGetPayload<{}>;

export type MessageCreate = Prisma.MessageUncheckedCreateInput;

export type SendMessageDto = {
	type: "text" | "image";
	text?: string | null;
	mediaUrl?: string | null;
	senderId: number;
	chatId: number;
};

export type SendMessagePayload = {
	type: "text" | "image";
	text?: string | null;
	mediaUrl?: string | null;
	chatId: number;
};
