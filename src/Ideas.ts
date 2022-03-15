import { AxiosInstance } from "axios";

export const getIdeasByProduct = (axios: AxiosInstance) => async (productId: string) =>
{
	return axios({
		method: "GET",
		url: `products/${productId}/ideas`
	});
}
export const getIdea = (axios: AxiosInstance) => async (ideaId: string) =>
{
	return axios({
		method: "GET",
		url: `ideas/${ideaId}`
	});
}
