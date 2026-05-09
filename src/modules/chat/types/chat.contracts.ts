import { JoinChatPayload, LeaveChatPayload } from "./chat.types";
import type {
	AuthenticatedSocket,
	SocketController,
} from "../../../socket/socket.types";

export type JoinChatCallback = (
	response: { status: "ok" } | { status: "error"; message?: string },
) => void;
//
export interface ChatClientEventsContract {
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
export interface ChatServiceContract {}
export interface ChatRepositoryContract {}

// Acknowledgment(ack) - это механизм, которые позволяет клиенту получить ответ от сервера на какое то событие(запрос)
