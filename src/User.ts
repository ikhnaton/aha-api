import { AxiosInstance } from "axios";

export const getCurrentUser = (axios: AxiosInstance) => async () =>
{
	return axios({
		method: "GET",
		url: "me"
	});
}
