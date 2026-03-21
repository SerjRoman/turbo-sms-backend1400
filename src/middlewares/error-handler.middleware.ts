import { Request, Response } from "express";
import { AppError } from "../errors/app.errors";

export function errorHandlerMiddleware(
	error: Error,
	req: Request,
	res: Response,
) {
	console.error(error);

	if (error instanceof AppError) {
		res.status(error.statusCode).json({
			status: "error",
			message: error.message,
		});
		return;
	}

	res.status(500).json({
		status: "error",
		message: "Internal Server Error",
	});
}
