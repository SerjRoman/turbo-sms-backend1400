import { Router } from "express";
import { MessageController } from "./message.controller";
import { authenticateMiddleware } from "@middlewares/authenticate.middleware";
export const MessageRouter = Router();
MessageRouter.use(authenticateMiddleware);
MessageRouter.get("/chats/:chatId", MessageController.getAllByChatId);
