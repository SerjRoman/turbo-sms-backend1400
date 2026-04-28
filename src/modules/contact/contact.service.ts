import { UserRepository } from "../user/user.repository";
import { ContactRepository } from "./contact.repository";
import { ContactsServiceContract } from "./types/contact.contracts";

export const ContactsService: ContactsServiceContract = {
	getAll: async (userId) => {
		const contacts = await ContactRepository.findAllByOwner(userId);

		return contacts;
	},
	getById: async (id, ownerId) => {
		const contact = await ContactRepository.findById(id, ownerId);
		return contact;
	},
	create: async (data, userId) => {
		const contactUser = await UserRepository.findById(data.contactUserId);
		const contact = await ContactRepository.create({
			...data,
			avatar: data.avatar || contactUser.avatar,
			ownerId: userId,
		});
		return contact;
	},
};
