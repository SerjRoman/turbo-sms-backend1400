import type { NextFunction, Request, Response } from "express";
import { AuthenticatedUser } from "@app-types/token";
import type {
	Chat,
	ChatUpdatePayload,
	ChatWithChatParticipants,
	ChatWithParticipantInfo,
	CreateChat,
	CreateChatDto,
	JoinChatPayload,
	LeaveChatPayload,
} from "./chat.types";
import type {
	AuthenticatedSocket,
	ServerSocket,
	SocketController,
} from "../../../socket/socket.types";
import { InferType } from "yup";
import { createChatSchema } from "../chat.schema";

export type JoinChatCallback = (
	response: { status: "ok" } | { status: "error"; message?: string },
) => void;
//
export interface ChatClientEventsContract {
	// Acknowledgment(ack) - это механизм, которые позволяет клиенту получить ответ от сервера на какое то событие(запрос)
	joinChat: (data: JoinChatPayload, ack?: JoinChatCallback) => void;
	leaveChat: (data: LeaveChatPayload) => void;
}

export interface ChatServerEvents {
	chatUpdate: (data: ChatUpdatePayload) => void;
}

export interface ChatSocketControllerContract extends SocketController {
	joinChat: (
		socket: AuthenticatedSocket,
		data: JoinChatPayload,
		ack?: JoinChatCallback,
	) => void;
	leaveChat: (socket: AuthenticatedSocket, data: LeaveChatPayload) => void;
	chatUpdate: (
		ioServer: ServerSocket,
		socket: AuthenticatedSocket,
		data: { chatId: number },
	) => void;
}
//
export interface ChatServiceContract {
	isChatParticipant: (chatId: number, userId: number) => Promise<boolean>;
	getChatParticipants: (chatId: number) => Promise<ChatWithChatParticipants>;
	create(dto: CreateChatDto): Promise<Chat>;
	getChatsWithParticipantInfo(
		ownerId: number,
	): Promise<ChatWithParticipantInfo[]>;
	getChatWithParticipantInfo(
		chatId: number,
		ownerId: number,
	): Promise<ChatWithParticipantInfo | null>;
}
export interface ChatRepositoryContract {
	getChatParticipants: (
		chatId: number,
	) => Promise<ChatWithChatParticipants | null>;
	getChatsWithParticipantInfo(
		ownerId: number,
	): Promise<ChatWithParticipantInfo[]>;
	getChatWithParticipantInfo(
		chatId: number,
		ownerId: number,
	): Promise<ChatWithParticipantInfo | null>;
	getChatByUsers: (p1: number, p2: number) => Promise<Chat | null>;
	create: (data: CreateChat) => Promise<Chat>;
}
export interface ChatControllerContract {
	create: (
		req: Request<
			object,
			Chat,
			InferType<typeof createChatSchema>,
			object,
			AuthenticatedUser
		>,
		res: Response<Chat, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	getChatsWithParticipantInfo: (
		req: Request<
			object,
			ChatWithParticipantInfo[],
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ChatWithParticipantInfo[], AuthenticatedUser>,
		next: NextFunction,
	) => void;
}
