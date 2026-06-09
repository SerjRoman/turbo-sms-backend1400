import { ServerSocket, AuthenticatedSocket } from "src/socket/socket.types";
import { UserSocketControllerContract } from "./types/user.contracts";
import {
	GetOnlineUsersAcknowlegment,
	SubscribeAndGetInitialStatusesAcknowlegment,
	UserStatus,
} from "./types/user.types";

const USER_ROOM_PREFIX = "user_room:";

export const UserSocketController: UserSocketControllerContract = {
	getOnlineUsers: function (
		ioServer: ServerSocket,
		socket: AuthenticatedSocket,
		userIds: number[],
		ack?: GetOnlineUsersAcknowlegment,
	): void {
		const onlineUserIds: number[] = [];
		for (const userId of userIds) {
			if (this.isUserOnline(ioServer, userId)) {
				onlineUserIds.push(userId);
			}
		}
		if (typeof ack === "function") {
			ack({ userIds: onlineUserIds });
		}
	},
	isUserOnline: function (ioServer: ServerSocket, id: number): boolean {
		return ioServer.sockets.adapter.rooms.has(`${USER_ROOM_PREFIX}${id}`);
	},
	registerHandlers: function (
		socket: AuthenticatedSocket,
		ioServer: ServerSocket,
	): void {
		console.log(
			"User joined the room: ",
			`${USER_ROOM_PREFIX}${socket.data.userId}`,
		);
		socket.join(`${USER_ROOM_PREFIX}${socket.data.userId}`);
		this.notifySubscribers(ioServer, socket.data.userId, "online");
		socket.on("getOnlineUsers", (userIds, ack) => {
			this.getOnlineUsers(ioServer, socket, userIds, ack);
		});
		socket.on("subscribeAndGetInitialStatuses", (userIds, ack) => {
			this.subscribeAndGetInitialStatuses(ioServer, socket, userIds, ack);
		});
		socket.on("disconnect", () => {
			socket.leave(`${USER_ROOM_PREFIX}${socket.data.userId}`);
			this.notifySubscribers(ioServer, socket.data.userId, "offline");
			console.log(
				"User left the room: ",
				`${USER_ROOM_PREFIX}${socket.data.userId}`,
			);
		});
	},
	subscriptions: new Map(),
	subscribeAndGetInitialStatuses: function (
		ioServer: ServerSocket,
		socket: AuthenticatedSocket,
		userIds: number[],
		ack?: SubscribeAndGetInitialStatusesAcknowlegment,
	): void {
		const statuses: UserStatus[] = [];
		for (const userId of userIds) {
			const existingSub = this.subscriptions.get(userId);
			if (existingSub) {
				existingSub.add(socket.data.userId);
			} else {
				this.subscriptions.set(userId, new Set([socket.data.userId]));
			}

			if (this.isUserOnline(ioServer, userId)) {
				statuses.push({ userId, status: "online" });
			} else {
				statuses.push({ userId, status: "offline" });
			}
		}
		if (typeof ack === "function") {
			ack({ statuses });
		}
	},
	notifySubscribers: function (
		ioServer: ServerSocket,
		userId: number,
		newStatus: "online" | "offline",
	): void {
		const subscribers = this.subscriptions.get(userId);
		if (!subscribers) return;
		for (const subscriberId of subscribers) {
			ioServer
				.to(`${USER_ROOM_PREFIX}${subscriberId}`)
				.emit("userStatusUpdated", {
					userId,
					status: newStatus,
				});
		}
	},
};
