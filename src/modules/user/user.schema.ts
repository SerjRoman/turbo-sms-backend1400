import * as yup from "yup";

export const regSchema = yup.object({
	email: yup
		.string()
		.email("Email must be valid")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must contain at least 6 characters")
		.max(100, "Password must contain less then 100 characters")
		.required("Password is required"),
	name: yup.string().required("Name is required"),
	surname: yup.string().required("Surname is required"),
	username: yup
		.string()
		.min(5, "Username must contain at least 5 characters")
		.max(50, "Username must contain less then 50 characters")
		.required("Username is required"),
});

export const loginSchema = yup.object({
	email: yup
		.string()
		.email("Email must be valid")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Username must contain at least 6 characters")
		.max(100, "Password must contain less then 100 characters")
		.required("Password is required"),
});
