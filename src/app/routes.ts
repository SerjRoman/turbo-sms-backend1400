import { Router } from "express";
import {
	processImageMiddleware,
	uploadMiddleware,
} from "../middlewares/upload.middleware";

export const appRoutes = Router();
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
