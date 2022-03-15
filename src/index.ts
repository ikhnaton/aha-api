import axios from 'axios';
import { getCurrentUser } from './User';
import { getIdea, getIdeasByProduct } from './Ideas';

const ahaApi = (key: string, ahaHost: string) =>
{
	const axiosInstance = axios.create({
		baseURL: `https://${ahaHost}/api/v1`,
		headers: {
			authorization: `Bearer ${key}`
		}
	});

	return {
		user: {
			getCurrentUser: getCurrentUser(axiosInstance)
		},
		ideas: {
			getIdeasByProduct: getIdeasByProduct(axiosInstance),
			getIdea: getIdea(axiosInstance)
		}
	};
};

export default ahaApi;
