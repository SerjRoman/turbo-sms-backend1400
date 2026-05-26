import * as yup from "yup";
export const getMessageSchema = yup.object({
	chatId: yup.number().required(),
});
