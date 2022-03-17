import { AxiosInstance } from "axios";
import { objectHasError, returnError } from "./util/errors";
import { getData } from "./util/Helpers";

export const getIdeasByProduct = (axios: AxiosInstance) => async (productId: string, page = "1") =>
{
	if (page === "all")
	{
		let currentPage = 1;
		let totalPages = 0;
		let ideas: any[] = [];

		do {
			const result: any = await getData(axios, {
				url: `products/${productId}/ideas?page=${currentPage}`
			});

			if (objectHasError(result))
			{
				return returnError(result);
			}

			totalPages = result.pagination.total_pages;
			currentPage += 1;
			ideas = [...ideas, ...result.ideas];
		}
		while (currentPage <= totalPages)

		return ideas;
	}
	return getData(axios, {
		url: `products/${productId}/ideas?page=${page}`
	});
}

export const getIdea = (axios: AxiosInstance) => async (ideaId: string) =>
{
	return getData(axios, {
		url: `ideas/${ideaId}`
	});
}
