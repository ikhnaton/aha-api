import { AxiosInstance } from "axios";
import { objectHasError, returnError } from "./util/errors";
import { getData } from "./util/Helpers";

export const getCurrentUser = (axios: AxiosInstance) => async () =>
{
	const user = await getData(axios, {
		url: "me"
	});

	if (objectHasError(user))
	{
		return returnError(user);
	}

	return user.user;
}
