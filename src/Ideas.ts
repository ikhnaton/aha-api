import { AxiosInstance } from "axios";
import { objectHasError, returnError } from "./util/errors";
import { getData } from "./util/Helpers";

type IdeaProps = {
	productId: string,
	page?: string,
	fields?: string[]
}
export const getIdeasByProduct = (axios: AxiosInstance) => async ({
	productId,
	page = "1",
	fields = []
}: IdeaProps) =>
{
	if (page === "all")
	{
		let currentPage = 1;
		let totalPages = 0;
		let ideas: any[] = [];

		do {
			const result: any = await getData(axios, {
				url: `products/${productId}/ideas?page=${currentPage}&fields=${fields.join((","))}`
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
		url: `products/${productId}/ideas?page=${page}&fields=${fields.join(".")}`
	});
}

export const getIdea = (axios: AxiosInstance) => async (ideaId: string) =>
{
	return getData(axios, {
		url: `ideas/${ideaId}`
	});
}
