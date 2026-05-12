import type {
	AuthenticatedSocket,
	ServerSocket,
	SocketController,
} from "../../../socket/socket.types";
import type {
	PaginatedResponse,
	PaginationParams,
} from "@app-types/pagination";
import type {
	Message,
	MessageCreate,
	SendMessageDto,
	SendMessagePayload,
} from "./message.types";

export interface MessageControllerContract {}

export interface MessageClientEvents {
	sendMessage: (data: SendMessagePayload) => void;
}

export interface MessageServerEvents {
	newChatMessage: (data: Message) => void;
}

export interface MessageSocketControllerContract extends SocketController {
	sendMessage: (
		ioServer: ServerSocket,
		socket: AuthenticatedSocket,
		data: SendMessagePayload,
	) => void;
	newChatMessage: (
		ioServer: ServerSocket,
		socket: AuthenticatedSocket,
		data: Message,
	) => void;
}

//

export interface MessageServiceContract {
	getAllByChatId: (
		chatId: number,
		pagination: PaginationParams,
	) => Promise<PaginatedResponse<Message>>;
	sendMessage: (dto: SendMessageDto) => Promise<Message>;
}

export interface MessageRepositoryContract {
	create: (data: MessageCreate) => Promise<Message>;
	getAllByChatId: (
		chatId: number,
		pagination: PaginationParams,
	) => Promise<PaginatedResponse<Message>>;
}
