import type { MessageClientEvents } from "../modules/message/types/message.contracts";
import type { ChatClientEventsContract } from "../modules/chat/types/chat.contracts";
import type {
	DefaultEventsMap,
	Socket,
	Server as SocketIOServer,
} from "socket.io";

export type AppServerEvents = DefaultEventsMap;
export interface AppClientEvents
	extends ChatClientEventsContract, MessageClientEvents {}

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
