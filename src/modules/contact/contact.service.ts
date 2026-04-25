// import { ContactRepository } from "./contact.repository";
// import { ContactsServiceContract } from "./types/contact.contracts";
// import { NotFoundError } from "../../errors/app.errors";
// import { CreateContact } from "./types/contact.types";


// export const ContactService: ContactSetvo = {
//     async getAll(userId: number){
//         const contacts = await ContactRepository.findAll(userId)
//         return contacts
//     },

//     async getContactById(id: number, ownerId: number){
//         const contract = await ContractRepository.findById(id)
//         if (!contact){
//             throw new NotFoundError("Contact not found")
//         }
//         if (contact.contactOwnerId !== ownerId){
//             throw new NotFoundError("Contact not found")
//         }
//         return contact
//     }, 

//     async create(
//         localName: string, 
//         contractUserId: number,
//         ownerId: number, 
//         avatar?: string
//     ){
//         const data: CreateContact = {
//             localName, 
//             contactUserId,
//             contactOwnerId: ownerId,
//         }
//         if (avatar){
//             data.avatar = avatar
//         }
// 		const contact = await ContactRepository.create(data);
// 		return contact;
//     }
// }