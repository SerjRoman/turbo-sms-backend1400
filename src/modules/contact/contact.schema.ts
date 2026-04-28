import * as yup from "yup";

export const createContactSchema = yup.object({
    localName: yup.string().required("Field is required"),
    contactUserId: yup.number().required("Field is required"),
})