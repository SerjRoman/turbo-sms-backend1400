import { PRISMA_CLIENT } from "@config/client";
import { ContactsRepositoryContract } from "./types/contact.contracts";

export const contactRepository: ContactsRepositoryContract = {
	async findAllByOwner(ownerId: number) {
		return PRISMA_CLIENT.contact.findMany({
			where: { ownerId },
		});
	},
	async findById(id: number) {
		return PRISMA_CLIENT.contact.findUnique({
			where: { id },
			include: {
				contactUser: {
					select: {
						username: true,
						avatar: true,
					},
				},
			},
		});
	},
	async findUserByUsername(username) {
		return await PRISMA_CLIENT.user.findUnique({
			where: { username },
		});
	},

	async create(data) {
		return await PRISMA_CLIENT.contact.create(data);
	},
};
