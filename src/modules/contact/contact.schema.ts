import * as yup from "yup";

export const contactCreateSchema = yup.object({
    localName: yup.string().required("localName is required"),
    contactUserId: yup.number().required("contactUserId is required")
})