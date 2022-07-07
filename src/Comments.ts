import { AxiosInstance } from "axios";
import { objectHasError, returnError } from "./util/errors";
import { deleteData, getData, postData } from "./util/Helpers";

export type CommentProps = {
	email: string,
	ideaId: string,
	commentId: string,
	comment: string,
	publicComment?: boolean
}
export const commentOnIdea = (axios: AxiosInstance) => async ({ ideaId, email, comment, publicComment = true }: CommentProps) =>
{
	if (publicComment === true)
	{
		return postData(axios, {
			url: `ideas/${ideaId}/idea_comments`,
			data: {
				"comment": {
					body: comment,
					"portal_user" : {
						email
					}
				}
			}
		});
	}
	return postData(axios, {
		url: `ideas/${ideaId}/comments`,
		data: {
			"comment": {
				body: comment,
				user: {
					email
				}
			}
		}
	});
};

export const getComments = (axios: AxiosInstance) => async (ideaId: string) =>
{
	return getData(axios, {
		url: `ideas/${ideaId}/comments`
	});
};

export const getCommentById = (axios: AxiosInstance) => async (commentId: string) =>
{
	return getData(axios, {
		url: `comments/${commentId}/`
	});
};

export const deleteComment = (axios: AxiosInstance) => async ({ commentId, email }: CommentProps) =>
{
	const comment = await getCommentById(axios)(commentId).catch(err => ({err}));

	if (comment.err)
	{
		console.log(comment.err);
		return 0;
	}

	if (comment.portal_user && (comment.portal_user.email !== email))
	{
		return 0;
	}

	if (comment.user && (comment.user.email !== email))
	{
		return 0;
	}

	return deleteData(axios, {
		url: `comments/${commentId}`
	});
};
