import { ChatSocketControllerContract } from "./types/chat.contracts";

const CHAT_ROOM_PREFIX = "chat:";

export const ChatSocketController: ChatSocketControllerContract = {
	joinChat: (socket, data, ack) => {
		console.log("Socket joined chat");
		socket.join(CHAT_ROOM_PREFIX + data.chatId);
		if (ack) {
			ack({ status: "ok" });
		}
	},
	leaveChat: (socket, data) => {
		console.log("Socket left chat");
		socket.leave(CHAT_ROOM_PREFIX + data.chatId);
	},
	registerHandlers: (socket) => {
		socket.on("joinChat", (data, ack) => {
			ChatSocketController.joinChat(socket, data, ack);
		});
		socket.on("leaveChat", (data) => {
			ChatSocketController.leaveChat(socket, data);
		});
	},
};
