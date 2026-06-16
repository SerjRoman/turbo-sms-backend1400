import { Router } from "express";
import { UserRouter } from "../modules/user/user.routes";
import { ChatRouter } from "src/modules/chat/chat.routes";
import { MessageRouter } from "src/modules/message/message.routes";
import { ContactRouter } from "src/modules/contact/contact.routes";

export const router = Router();

router.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: Date.now() });
});

router.use("/users/", UserRouter);

router.use("/contacts/", ContactRouter);

router.use("/chats/", ChatRouter);
router.use("/messages/", MessageRouter);