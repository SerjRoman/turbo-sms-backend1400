import { Router } from "express";
import {
	processImageMiddleware,
	uploadMiddleware,
} from "../middlewares/upload.middleware";
import { UserRoutes } from "../modules/user/user.routes";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware";

export const appRoutes = Router();

appRoutes.use("/users/", UserRoutes);

appRoutes.get("/health", (req, res) => {
	res.json({
		status: "OK",
		timestamp: Date.now(),
	});
});
appRoutes.post(
	"/test-image-upload",
	uploadMiddleware.single("image"),
	processImageMiddleware(600, 1),
	(req, res) => {
		res.json({
			status: "success",
			filename: req.file?.filename,
		});
	},
);

appRoutes.use("/contacts", authenticateMiddleware, ContactRoutes);
appRoutes.get("/me", authenticateMiddleware, (req, res) => {
	res.json({
		id: req.user?.id,
		username: req.user?.username,
		email: req.user?.email,
		avatar: req.user?.avatar,
	})
});

appRoutes.use("*", (req, res) => {
	res.status(404).json({
		message: "Not Found",
		error: "404",
	})
});
