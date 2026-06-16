import { MessageSocketControllerContract } from "./types/message.contracts";
import { MessageService } from "./message.service";
import { ChatSocketController } from "../chat/chat.socket.controller";

export const MessageSocketController: MessageSocketControllerContract = {
	sendMessage: async function (ioServer, socket, data) {
		try {
			const newMessage = await MessageService.sendMessage({
				...data,
				senderId: socket.data.userId,
			});
			this.newChatMessage(ioServer, socket, newMessage);
			ChatSocketController.chatUpdate(ioServer, socket, {
				chatId: newMessage.chatId,
			});
		} catch (error) {
			console.error(error);
		}
	},
	newChatMessage: async function (ioServer, socket, data) {
		ioServer.to("chat:" + data.chatId).emit("newChatMessage", data);
	},
	registerHandlers: function (socket, ioServer) {
		socket.on("sendMessage", (data) => {
			this.sendMessage(ioServer, socket, data);
		});
	},
};
