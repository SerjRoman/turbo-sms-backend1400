import { BadRequestError, ValidationError } from "@errors/app.errors";
import type { ContactsControllerContract } from "./types/contact.contracts";
import { ContactsService } from "./contact.service";

export const ContactsController: ContactsControllerContract = {
	getAll: async function (req, res, next) {
		try {
			const contacts = await ContactsService.getAll(res.locals.userId);
			res.status(200).json(contacts);
		} catch (error) {
			next(error);
		}
	},
	getContactById: async (req, res, next) => {
		try {
			const id = Number(req.params.id);

			if (!id) {
				throw new BadRequestError("id required");
			}

			const contact = await ContactsService.getContactById(
				id,
				res.locals.userId,
			);

			res.json(contact);
		} catch (error) {
			next(error);
		}
	},

	create: async (req, res, next) => {
		try {
			const { localName, contactUserId } = req.body;

			if (!localName || !contactUserId) {
				throw new BadRequestError("invalid data");
			}

			const contact = await ContactsService.create({
				localName,
				contactUserId: Number(contactUserId),
				ownerId: res.locals.userId,
				avatar: req.file?.filename || "default.png",
			});

			res.status(201).json(contact);
		} catch (error) {
			next(error);
		}
	},

	findUserByUsername: async (req, res, next) => {
		try {
			const user = await ContactsService.findUserByUsername(
				req.params.username,
			);
			res.json(user);
		} catch (error) {
			next(error);
		}
	},
};
