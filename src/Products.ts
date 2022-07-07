import { AxiosInstance } from "axios";
import { objectHasError, returnError } from "./util/errors";
import { getData, postData, putData } from "./util/Helpers";

type IdeaProps = {
	productId: string,
	page?: string,
	fields?: string[]
}
export const getProductById = (axios: AxiosInstance) => async ({
	productId,
	fields = []
}: IdeaProps) =>
{
	return getData(axios, {
		url: `products/${productId}/ideas?fields=${fields.join(",")}`
	});
}
