import axios from "axios";
import { getCurrentUser } from './User';
import { createIdea, updateIdea, getIdea, getIdeasByProduct, CreateIdeaProps, UpdateIdeaProps } from './Ideas';
import { voteForIdea, VoteProps, deleteVoteFromIdea, getVotes } from './Endorsements';

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
			createIdea: createIdea(axiosInstance),
			updateIdea: updateIdea(axiosInstance)
		},
		endorsements: {
			getVotes: getVotes(axiosInstance),
			voteForIdea: voteForIdea(axiosInstance),
			deleteVote: deleteVoteFromIdea(axiosInstance)
		}
	};
};

export default ahaApi;
