import { ChatService } from "./chat.service";
import { ChatControllerContract } from "./types/chat.contracts";

export const ChatController: ChatControllerContract = {
	async create(req, res, next) {
		try {
			const chat = await ChatService.create({
				ownerId: res.locals.userId,
				contactUserId: req.body.contactUserId,
			});

			res.status(200).json(chat);
		} catch (e) {
			console.log(e);
			next(e);
		}
	},
	async getChatsWithParticipantInfo(req, res, next) {
		try {
			const chats = await ChatService.getChatsWithParticipantInfo(
				res.locals.userId,
			);

			res.status(200).json(chats);
		} catch (e) {
			console.log(e);
			next(e);
		}
	},
};
