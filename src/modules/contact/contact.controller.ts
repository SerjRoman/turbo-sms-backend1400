// import { ValidationError } from "@errors/app.errors";
// import type { ContactsControllerContract } from "./types/contact.contracts";
// import { ContactsService } from "./contact.service";

// export const ContactsController: ContactsControllerContract = {
//     getAll: async function (req, res, next) {
// 		try {
			
//             const contacts = await ContactsService.getAll(res.locals.userId);
//             res.status(200).json(contacts)

// 		} catch (error) {
// 			next(error)
// 		}
// 	},
// 	getContactById: async function (req, res, next){
// 	    try {
// 	    	const contactId =  await ContactsService.getContactById(Number(req.params.userId), res.locals.userId)
// 	    	res.status(200).json(contactId);
// 	    } catch (error) {
// 	    	next(error)
// 	    }
// 	},
// 	create: async function(req, res, next){ {
// 		const { name, phone } = req.body;
// 	}
    
// }

// }

