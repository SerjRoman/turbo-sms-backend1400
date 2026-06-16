import { AppError } from "@errors/app.errors";
import { ChatService } from "./chat.service";
import { ChatSocketControllerContract } from "./types/chat.contracts";
import { USER_ROOM_PREFIX } from "../user/user.constants";
const CHAT_ROOM_PREFIX = "chat:";

export const ChatSocketController: ChatSocketControllerContract = {
	joinChat: async (socket, data, ack) => {
		try {
			const isChatParticipant = await ChatService.isChatParticipant(
				data.chatId,
				socket.data.userId,
			);
			if (isChatParticipant) {
				socket.join(CHAT_ROOM_PREFIX + data.chatId);
				if (ack) {
					ack({ status: "ok" });
				}
			} else if (ack) {
				ack({
					status: "error",
					message: `User:${socket.data.userId} is not a chat participant of chat:${data.chatId}`,
				});
			}
		} catch (error) {
			console.error(error);
			if (!ack) return;
			if (error instanceof AppError) {
				ack({
					status: "error",
					message: error.message,
				});
			}
		}
	},
	leaveChat: async (socket, data) => {
		console.log("Socket left chat");
		socket.leave(CHAT_ROOM_PREFIX + data.chatId);
	},
	chatUpdate: async (ioServer, socket, data) => {
		try {
			const chat = await ChatService.getChatWithParticipantInfo(
				data.chatId,
				socket.data.userId,
			);
			if (!chat) return;
			chat.participants.forEach((p) => {
				const fullname = p.user.name + " " + p.user.surname;
				ioServer
					.to(USER_ROOM_PREFIX + `${p.user.id}`)
					.emit("chatUpdate", {
						...chat,
						senderId: chat.lastMessage!.senderId,
						senderFullname: fullname,
					});
			});
		} catch (e) {
			console.log(e);
		}
	},
	registerHandlers: (socket, ioServer) => {
		socket.on("joinChat", (data, ack) => {
			ChatSocketController.joinChat(socket, data, ack);
		});
		socket.on("leaveChat", (data) => {
			ChatSocketController.leaveChat(socket, data);
		});
	},
};
