import axios from "axios";
import { getCurrentUser } from './User';
import { createIdea, getIdea, getIdeasByProduct, CreateIdeaProps } from './Ideas';

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
			getIdea: getIdea(axiosInstance),
			createIdea: (idea: CreateIdeaProps) => createIdea(idea, axiosInstance)
		}
	};
};

export default ahaApi;
