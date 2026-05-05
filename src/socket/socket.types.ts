import type {
	DefaultEventsMap,
	Socket,
	Server as SocketIOServer,
} from "socket.io";

export type AppServerEvents = DefaultEventsMap;
export type AppClientEvents = DefaultEventsMap;

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
