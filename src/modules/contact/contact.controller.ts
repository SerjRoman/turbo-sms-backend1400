import { BadRequestError } from "@errors/app.errors";
import { ContactsService } from "./contact.service";
import type { ContactsControllerContract } from "./types/contact.contracts";
import { CreateContact } from "./types/contact.types";

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
	getByUsername: async (req, res, next) => {
		if (!req.params.username) {
			throw new BadRequestError("username is required");
		}
		try {
			const contact = await ContactsService.findUserByUsername(
				req.params.username,
			);
			res.status(200).json(contact);
		} catch (error) {
			next(error);
		}
	},
	create: async (req, res, next) => {
		if (!req.body) {
			throw new BadRequestError("body is required");
		}
		if (!req.body.contactUserId) {
			throw new BadRequestError("contactUserId is required");
		}
		if (!req.body.localName) {
			throw new BadRequestError("localName is required");
		}

		try {
			const contact = await ContactsService.create(
				{
					...req.body,
					avatar: req.file?.filename || "",
				},
				res.locals.userId,
			);
			res.status(200).json(contact);
		} catch (error) {
			next(error);
		}
	},
};
