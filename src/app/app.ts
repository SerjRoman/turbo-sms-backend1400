import express, { type Express } from "express";
import cors from "cors";
import { env } from "../config/env";
import { router } from "./routes";
import {
	logMiddleware,
	errorMiddleware,
	authenticateSocketMiddleware,
} from "../middlewares";
import path from "node:path";
import { createServer } from "node:http";
import { SocketManagerIO } from "../socket";
import { ChatSocketController } from "../modules/chat/chat.socket.controller";
import { MessageSocketController } from "../modules/message/message.socket.controller";

const app: Express = express();

const httpServer = createServer(app);

const socketManager = new SocketManagerIO(httpServer);

socketManager.useMiddleware(authenticateSocketMiddleware);

socketManager.initConnection((socket, ioServer) => {
	console.log("User joined the room: ", `user_room:${socket.data.userId}`);
	socket.join(`user_room:${socket.data.userId}`);

	ChatSocketController.registerHandlers(socket, ioServer);
	MessageSocketController.registerHandlers(socket, ioServer);

	socket.on("disconnect", () => {
		socket.leave(`user_room:${socket.data.userId}`);
		console.log("User left the room: ", `user_room:${socket.data.userId}`);
	});
});

app.use(cors({ origin: "" }));
app.use(logMiddleware);
app.use(express.json());

app.use(router);

app.use("/media/", express.static(path.join(__dirname, "../../media")));

app.use(errorMiddleware);

httpServer.listen(env.PORT, env.HOST, () => {
	console.log(`Server started on http://${env.HOST}:${env.PORT}`);
	console.log(`Socket server started on ws://${env.HOST}:${env.PORT}`);
});
