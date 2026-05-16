import type {
	Chat,
	ChatWithChatParticipants,
	ChatWithParticipantInfo,
	CreateChatDto,
	JoinChatPayload,
	LeaveChatPayload,
} from "./chat.types";
import type {
	AuthenticatedSocket,
	SocketController,
} from "../../../socket/socket.types";

export type JoinChatCallback = (
	response: { status: "ok" } | { status: "error"; message?: string },
) => void;
//
export interface ChatClientEventsContract {
	// Acknowledgment(ack) - это механизм, которые позволяет клиенту получить ответ от сервера на какое то событие(запрос)
	joinChat: (data: JoinChatPayload, ack?: JoinChatCallback) => void;
	leaveChat: (data: LeaveChatPayload) => void;
}

export interface ChatServerEventsContract {}

export interface ChatSocketControllerContract extends SocketController {
	joinChat: (
		socket: AuthenticatedSocket,
		data: JoinChatPayload,
		ack?: JoinChatCallback,
	) => void;
	leaveChat: (socket: AuthenticatedSocket, data: LeaveChatPayload) => void;
}
//
export interface ChatServiceContract {
	isChatParticipant: (chatId: number, userId: number) => Promise<boolean>;
	getChatParticipants: (chatId: number) => Promise<ChatWithChatParticipants>;
	create(dto: CreateChatDto): Promise<Chat>;
	getChatsWithParticipantInfo(
		ownerId: number,
	): Promise<ChatWithParticipantInfo[]>;
}
export interface ChatRepositoryContract {
	getChatParticipants: (
		chatId: number,
	) => Promise<ChatWithChatParticipants | null>;
	getChatsWithParticipantInfo(
		ownerId: number,
	): Promise<ChatWithParticipantInfo[]>;
}
