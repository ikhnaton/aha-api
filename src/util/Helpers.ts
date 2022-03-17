
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { objectHasError, returnError } from './errors';
export const getData = async (axios: AxiosInstance, config: AxiosRequestConfig) =>
{
	const result: any = await axios({ ...config, method: "GET" }).catch((err: any) => ({ err }));

	return objectHasError(result) ? returnError(result) : result.data;
};
