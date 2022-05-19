
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { objectHasError, returnError } from "./errors";
export const getData = async (axios: AxiosInstance, config: AxiosRequestConfig) =>
{
	const result: any = await axios({ ...config, method: "GET" }).catch((err: any) => ({ err }));

	return objectHasError(result) ? returnError(result) : result.data;
};

export const postData = async (axios: AxiosInstance, config: AxiosRequestConfig) =>
{
	const result: any = await axios({ ...config, method: "POST" }).catch((err: any) => ({ err }));

	return objectHasError(result) ? returnError(result) : result.data;
};

export const putData = async (axios: AxiosInstance, config: AxiosRequestConfig) =>
{
	const result: any = await axios({ ...config, method: "PUT" }).catch((err: any) => ({ err }));

	return objectHasError(result) ? returnError(result) : result.data;
};

export const deleteData = async (axios: AxiosInstance, config: AxiosRequestConfig) =>
{
	const result: any = await axios({ ...config, method: "DELETE" }).catch((err: any) => ({ err }));

	return objectHasError(result) ? returnError(result) : result.data || result;
};
