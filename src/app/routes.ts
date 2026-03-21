import { Router } from "express";
import {
	processImageMiddleware,
	uploadMiddleware,
} from "../middlewares/upload";

export const router = Router();

router.get("/health", (req, res) => {
	res.json({ status: "ok", timestamp: Date.now() });
});
router.post(
	"/test-image",
	uploadMiddleware.single("image"),
	processImageMiddleware(300, 50),
	(req, res) => {
		console.log(req.file?.filename);
		res.status(200).json({
			status: "success",
			filename: req.file?.filename,
		});
	},
);
