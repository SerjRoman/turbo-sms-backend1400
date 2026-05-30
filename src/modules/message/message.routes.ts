import { Router } from "express";
import { MessageController } from "./message.controller";
import { authenticateMiddleware } from "@middlewares/authenticate.middleware";
import { processImageMiddleware, uploadMiddleware } from "@middlewares/upload";
export const MessageRouter = Router();
MessageRouter.use(authenticateMiddleware);
MessageRouter.get("/chats/:chatId", MessageController.getAllByChatId);
MessageRouter.post(
	"/media",
	authenticateMiddleware,
	uploadMiddleware.single("media"),
	processImageMiddleware(true, 600, 80),
	MessageController.uploadMessageMedia,
);
