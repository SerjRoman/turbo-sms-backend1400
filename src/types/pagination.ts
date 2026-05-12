import * as yup from "yup";
import { InferType } from "yup";

export type PaginationParams = InferType<typeof PaginationSchema>;

export interface PaginationPayload {
	page: number;
	take: number;
	totalPages: number;
}

export type PaginatedResponse<T> = {
	data: T[];
	meta: PaginationPayload;
};

export const PaginationSchema = yup.object({
	page: yup.number().default(1).min(1, "Page must be > 0"),
	take: yup.number().default(10).min(0, "Take must be positive number"),
});
