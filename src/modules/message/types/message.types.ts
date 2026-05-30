import { type Prisma } from "../../../generated/prisma";

export type Message = Prisma.MessageGetPayload<{}>;

export type MessageCreate = Prisma.MessageUncheckedCreateInput;

export type SendMessageDto = {
	type: "text" | "media";
	text?: string | null;
	media?: string | null;
	senderId: number;
	chatId: number;
};

export type SendMessagePayload = {
	type: "text" | "media";
	text?: string | null;
	media?: string | null;
	chatId: number;
};
