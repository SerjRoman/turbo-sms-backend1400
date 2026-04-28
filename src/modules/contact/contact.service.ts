import { ContactsServiceContract } from "./types/contact.contracts";
import { contactRepository } from "./contact.repository";
import { ConflictError, NotFoundError } from "@errors/app.errors";

export const ContactsService: ContactsServiceContract = {
	async getAll(userId) {
		return contactRepository.findAllByOwner(userId);
	},

	async getContactById(id, ownerId) {
		const contact = await contactRepository.findById(id);

		if (!contact || contact.ownerId !== ownerId) {
			throw new NotFoundError("Contact not found");
		}

		return contact;
	},

	async create(data) {
		try {
			return await contactRepository.create({
				data: {
					localName: data.localName,
					avatar: data.avatar || "default.png",
					ownerId: data.ownerId,
					contactUserId: data.contactUserId,
				},
			});
		} catch (error: any) {
			if (error.code === "P2002") {
				throw new ConflictError("already exists");
			}
			throw error;
		}
	},

	async findUserByUsername(username) {
		const user = await contactRepository.findUserByUsername(username);

		if (!user) {
			throw new NotFoundError("User not found");
		}

		return user;
	},
};
