// src/services/baseService.ts

import Query from "../http/Query";
import type { DocumentId } from "@/lib/types/common/base_type";
import qs from "qs";
import { handleError, handleResponse } from "./response.service";
import type { StandardResponse } from "./response.service";

/**
 * Generic base service to handle common CRUD operations.
 * @template T - The type of the data entity.
 * @template FormT - The type of the form data used for creating/updating.
 */
class BaseService<T, FormT> {
	protected constructor(protected endpoint: string) {}

	/**
	 * Generates headers for HTTP requests.
	 * @param {boolean} contentType - Whether to include the Content-Type header.
	 * @param {string} [token] - Optional JWT token for authorization.
	 * @returns {Headers} - The headers object.
	 */
	protected getHeaders(contentType = false, token?: string): Headers {
		if (!token) {
			throw new Error("Authorization token is required.");
		}

		const headers = new Headers({
			Authorization: `Bearer ${token}`,
		});

		if (contentType) {
			headers.append("Content-Type", "application/json");
		}

		return headers;
	}

	/**
	 * Fetches a list of entities based on provided query options.
	 * @param {Query} [options] - Query parameters for filtering, sorting, pagination, etc.
	 * @param {string} token - JWT token for authorization.
	 * @returns {Promise<StandardResponse<T[]>>} - The standard response containing an array of entities.
	 */
	async find(
		options: Query | undefined,
		token: string,
	): Promise<StandardResponse<T[]>> {
		const query = qs.stringify(options, { encodeValuesOnly: true });
		const url = `${process.env.BACKEND_URL}${this.endpoint}?${query}`;
		try {
			const response = await fetch(url, {
				headers: this.getHeaders(false, token),
				cache: "no-store",
			});
			return await handleResponse<T[]>(response);
		} catch (error: any) {
			return handleError<T[]>(error);
		}
	}

	/**
	 * Fetches a single entity by its ID with populated relations.
	 * @param {string} id - The unique identifier of the entity.
	 * @param {Query} [options] - Query parameters for filtering, sorting, pagination, etc.
	 * @param {string} token - JWT token for authorization.
	 * @returns {Promise<StandardResponse<T>>} - The standard response containing the entity details.
	 */
	async findOne(
		id: DocumentId,
		options: Query | undefined,
		token: string,
	): Promise<StandardResponse<T>> {
		const query = qs.stringify(options, { encodeValuesOnly: true });
		const url = `${process.env.BACKEND_URL}${this.endpoint}/${id}?${query}`;

		try {
			const response = await fetch(url, {
				headers: this.getHeaders(false, token),
				cache: "no-store",
			});
			return await handleResponse<T>(response);
		} catch (error: any) {
			return handleError<T>(error);
		}
	}

	/**
	 * Deletes an entity by its ID.
	 * @param {string} id - The unique identifier of the entity to delete.
	 * @param {string} token - JWT token for authorization.
	 * @returns {Promise<StandardResponse<null>>} - The standard response indicating success or failure.
	 */
	async delete(id: DocumentId, token: string): Promise<StandardResponse<null>> {
		const url = `${process.env.BACKEND_URL}${this.endpoint}/${id}`;
		try {
			const response = await fetch(url, {
				method: "DELETE",
				headers: this.getHeaders(false, token),
			});
			if (response.ok) {
				return {
					data: null,
					status: response.status,
					success: true,
				};
			}
			const errorData = await response.json();
			return {
				data: null,
				status: response.status,
				success: false,
				errorMessage:
					`${errorData.error.message} Status -${errorData.error.status}` ||
					`Failed to delete. Status - ${errorData.status}`,
			};
		} catch (error: any) {
			return handleError<null>(error);
		}
	}

	/**
	 * Creates a new entity.
	 * @param {FormT} form - The form data to create the entity.
	 * @param {string} token - JWT token for authorization.
	 * @returns {Promise<StandardResponse<T>>} - The standard response containing the created entity.
	 */
	async create(form: FormT, token: string): Promise<StandardResponse<T>> {
		const url = `${process.env.BACKEND_URL}${this.endpoint}`;

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: this.getHeaders(true, token),
				body: JSON.stringify({ data: form }),
			});
			return await handleResponse<T>(response);
		} catch (error: any) {
			return handleError<T>(error);
		}
	}

	/**
	 * Updates an existing entity by its ID.
	 * @param {string} id - The unique identifier of the entity to update.
	 * @param {Partial<FormT>} form - The updated form data.
	 * @param {string} token - JWT token for authorization.
	 * @returns {Promise<StandardResponse<T>>} - The standard response containing the updated entity.
	 */
	async update(
		id: DocumentId,
		form: Partial<FormT>,
		token: string,
	): Promise<StandardResponse<T>> {
		const url = `${process.env.BACKEND_URL}${this.endpoint}/${id}`;

		try {
			const response = await fetch(url, {
				method: "PUT",
				headers: this.getHeaders(true, token),
				body: JSON.stringify({ data: form }),
			});
			return await handleResponse<T>(response);
		} catch (error: any) {
			return handleError<T>(error);
		}
	}

}

export default BaseService;
