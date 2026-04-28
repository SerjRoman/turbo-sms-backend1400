import { ContactsServiceContract } from "./types/contact.contracts";
import { ContactRepository } from "./contact.repository";

export const ContactsService: ContactsServiceContract = {
	getAll: async (userId) => {
		const contacts = await ContactRepository.findAllByOwner(userId);

		return contacts;
	},
	getById: async (id, ownerId) => {
		const contact = await ContactRepository.findById(id, ownerId);
		return contact;
	},
	findUserByUsername: async (username) => {
		const contact = await ContactRepository.findUserByUsername(username);
		return contact;
	},
	create: async (data, userId) => {
		console.log({
			...data,
			avatar: data.avatar || "default.jpg",
			ownerId: userId,
		});
		const contact = await ContactRepository.create({
			...data,
			avatar: data.avatar || "default.jpg",
			ownerId: userId,
		});
		return contact;
	},
};
