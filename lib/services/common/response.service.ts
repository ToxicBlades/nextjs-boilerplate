import { MetaData } from "../http/Query";

// Define a standardized response interface
export interface StandardResponse<T> {
	data: T | null;
	status: number;
	success: boolean;
	errorMessage?: string;
	meta?: MetaData;
}

// Process item function can be absolutely any depending on which response your backend gives
// This is example for strapi answers
function processItem(item: any): any {
	if (item === null || item === undefined) {
		return item;
	} else if (Array.isArray(item)) {
		return item.map(processItem);
	} else if (typeof item === "object") {
		if ("id" in item && "attributes" in item) {
			const { id, attributes } = item;
			return { id, ...processItem(attributes) };
		} else if ("data" in item) {
			return processItem(item.data);
		} else {
			const processedItem: any = {};
			for (const key in item) {
				processedItem[key] = processItem(item[key]);
			}
			return processedItem;
		}
	} else {
		return item;
	}
}

// Handle successful responses
export async function handleResponse<T>(
	response: Response,
): Promise<StandardResponse<T>> {
	const status = response.status;
	const success = response.ok;
	try {
		const json = await response.json();
		let data: T | null = null;
		let meta: any = undefined;
		if (json.error) {
			return {
				data: null,
				status: json.error.status,
				success: false,
				errorMessage: `Error: ${json.error.name} + Message: ${json.error.message}`,
			};
		}
		if (json.data) {
			data = processItem(json.data) as T;
			meta = json.meta;
		} else {
			data = processItem(json) as T;
		}

		return {
			data,
			status,
			success,
			meta,
		};
	} catch (error) {
		return {
			data: null,
			status,
			success: false,
			errorMessage: "Failed to parse response JSON.",
		};
	}
}

// Handle errors
export function handleError<T>(error: any): StandardResponse<T> {
	console.log(error);
	return {
		data: null,
		status: error.status || 500,
		success: false,
		errorMessage: error.message || "An unknown error occurred.",
	};
}
