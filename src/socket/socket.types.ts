import type {
	MessageClientEvents,
	MessageServerEvents,
} from "../modules/message/types/message.contracts";
import type {
	ChatClientEventsContract,
	ChatServerEvents,
} from "../modules/chat/types/chat.contracts";
import type { Socket, Server as SocketIOServer } from "socket.io";
import {
	UserClientEvents,
	UserServerEvents,
} from "../modules/user/types/user.contracts";

export interface AppServerEvents
	extends UserServerEvents, ChatServerEvents, MessageServerEvents {}
export interface AppClientEvents
	extends ChatClientEventsContract, MessageClientEvents, UserClientEvents {}

export interface SocketData {
	userId: number;
}

export type AuthenticatedSocket = Socket<
	AppClientEvents,
	AppServerEvents,
	object,
	SocketData
>;

export type ServerSocket = SocketIOServer<
	AppClientEvents,
	AppServerEvents,
	object,
	SocketData
>;

export interface SocketController {
	registerHandlers: (
		socket: AuthenticatedSocket,
		ioServer: ServerSocket,
	) => void;
}
