import { Request, Response, NextFunction } from "express";

export function logMiddleware(req: Request, res: Response, next: NextFunction) {
	console.log(`[${req.method}] ${req.path} ${new Date().toISOString()}`);
	next();
}
