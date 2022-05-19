import { AxiosInstance } from "axios";
import { objectHasError, returnError } from "./util/errors";
import { deleteData, getData, postData } from "./util/Helpers";

export type VoteProps = {
	email: string,
	ideaId: string
}
export const voteForIdea = (axios: AxiosInstance) => async ({ ideaId, email }: VoteProps) =>
{
	return postData(axios, {
		url: `ideas/${ideaId}/endorsements`,
		data: {
			"idea_endorsement": {
				email,
				value: 1
			}
		}
	});
};

export const getVotes = (axios: AxiosInstance) => async (ideaId: string) =>
{
	return getData(axios, {
		url: `ideas/${ideaId}/endorsements`
	});
};

export const deleteVoteFromIdea = (axios: AxiosInstance) => async ({ ideaId, email }: VoteProps) =>
{
	const endorsements = await getVotes(axios)(ideaId).catch(err => []);

	const endorsementsOnly = endorsements["idea_endorsements"] || [];

	const [match] = endorsementsOnly.filter((vote: any) =>
		vote["endorsed_by_portal_user"].email === email || vote["endorsed_by_idea_user"].email === email );

	if (!match)
	{
		return 0;
	}

	return deleteData(axios, {
		url: `ideas/${ideaId}/endorsements/${match.id}`
	});
};
