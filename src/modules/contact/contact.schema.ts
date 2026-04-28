import * as yup from "yup";

export const contactCreateSchema = yup.object({
    body: yup.object({
        localName: yup
            .string()
            .trim()
            .required("Имя контакта обязательно для заполнения")
            .min(2, "Имя слишком короткое")
            .max(50, "Имя слишком длинное"),
            
        contactUserId: yup
            .string()
            .required("ID пользователя обязателен")
            .test("is-number", "contactUserId должен быть числом", (value) => {
                return !isNaN(Number(value));
            }),
    }),
});