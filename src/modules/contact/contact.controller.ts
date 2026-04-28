import { BadRequestError } from "@errors/app.errors";
import { ContactsService } from "./contact.service";
import type { ContactsControllerContract } from "./types/contact.contracts";

export const ContactsController: ContactsControllerContract = {
	getAll: async (req, res, next) => {
		try {
			const contacts = await ContactsService.getAll(res.locals.userId);
			res.status(200).json(contacts);
		} catch (error) {
			next(error);
		}
	},
	getById: async (req, res, next) => {
		if (!req.params.id) {
			throw new BadRequestError("id is required");
		}
		if (isNaN(+req.params.id)) {
			throw new BadRequestError("id must be integer");
		}
		try {
			const contact = await ContactsService.getById(
				+req.params.id,
				res.locals.userId,
			);
			res.status(200).json(contact);
		} catch (error) {
			next(error);
		}
	},
	create: async (req, res, next) => {
		try {
			const contact = await ContactsService.create(
				{
					...req.body,
					avatar: req.file?.filename || null,
				},
				res.locals.userId,
			);
			res.status(200).json(contact);
		} catch (error) {
			next(error);
		}
	},
};
