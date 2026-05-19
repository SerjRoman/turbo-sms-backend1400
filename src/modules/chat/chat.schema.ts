import * as yup from "yup";

export const createChatSchema = yup.object({
	contactUserId: yup.number().required("User id is required"),
});
