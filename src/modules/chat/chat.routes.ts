import { authenticateMiddleware } from "@middlewares/authenticate.middleware";
import { validateMiddleware } from "@middlewares/validate.middleware";
import { Router } from "express";
import { ChatController } from "./chat.controller";
import { createChatSchema } from "./chat.schema";

export const ChatRouter = Router();

ChatRouter.post(
	"/",
	authenticateMiddleware,
	validateMiddleware(createChatSchema),
	ChatController.create,
);

ChatRouter.get(
	"/",
	authenticateMiddleware,
	ChatController.getChatsWithParticipantInfo,
);
