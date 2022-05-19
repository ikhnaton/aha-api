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
			createIdea: (idea: CreateIdeaProps) => createIdea(axiosInstance)(idea),
			updateIdea: (idea: UpdateIdeaProps) => updateIdea(axiosInstance)(idea)
		},
		endorsements: {
			getVotes: (ideaId: string) => getVotes(axiosInstance)(ideaId),
			voteForIdea: (vote: VoteProps) => voteForIdea(axiosInstance)(vote),
			deleteVote: (vote: VoteProps) => deleteVoteFromIdea(axiosInstance)(vote)
		}
	};
};

export default ahaApi;
