import type { NextFunction, Request, Response } from "express";
import { ValidationError as YupValidationError, type AnySchema } from "yup";
import { ValidationError } from "../errors/app.errors";

export function validateMiddleware(schema: AnySchema) {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			const validated = await schema.validate(req.body, {
				abortEarly: false,
				stripUnknown: true,
			});
			req.body = validated;
			next();
		} catch (error) {
			if (error instanceof YupValidationError) {
				next(
					new ValidationError(
						error.inner.reduce(
							(prev, current) => prev + " " + current,
							"",
						),
					),
				);
				return;
			}
			next(error);
		}
	};
}
