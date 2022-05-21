import { AxiosInstance } from "axios";
import { objectHasError, returnError } from "./util/errors";
import { getData, postData, putData } from "./util/Helpers";

type IdeaProps = {
	productId: string,
	page?: string,
	fields?: string[]
}
export const getIdeasByProduct = (axios: AxiosInstance) => async ({
	productId,
	page = "1",
	fields = []
}: IdeaProps) =>
{
	if (page === "all")
	{
		let currentPage = 1;
		let totalPages = 0;
		let ideas: any[] = [];

		do {
			const result: any = await getData(axios, {
				url: `products/${productId}/ideas?page=${currentPage}&fields=${fields.join((","))}`
			});

			if (objectHasError(result))
			{
				return returnError(result);
			}

			totalPages = result.pagination.total_pages;
			currentPage += 1;
			ideas = [...ideas, ...result.ideas];
		}
		while (currentPage <= totalPages)

		return ideas;
	}
	return getData(axios, {
		url: `products/${productId}/ideas?page=${page}&fields=${fields.join(".")}`
	});
}

export type GetIdeaProps = {
	ideaId: string,
	fields: string[]
};

export const getIdea = (axios: AxiosInstance) => async ({ ideaId, fields }: GetIdeaProps) =>
{
	return getData(axios, {
		url: `ideas/${ideaId}?fields=${fields.join(".")}`
	});
}

export type CreateIdeaProps = {

	/* Numeric ID or key of the product */
	productId: string,

	/* Email address of user that created the idea. The email address does not need to be for a user of Aha! */
	createdBy: string,

	/* Name of the idea */
	name?: string,

	/* Description of the idea and it can include HTML formatting. */
	description?: string,

	/* Status of the idea and it must be one of the valid status values for the selected product. */
	workflowStatus?: string,

	/* Tags can be automatically assigned to the new idea. If more than one tag is used then tags should be separated by commas. */
	tags?: string,

	/* Names of the existing categories the idea should be assigned to. If more than one category is used then categories should be separated by commas. */
	categories?: string,

	/* Email address of user that is assigned the idea. */
	assignedToUser?: string,

	/* Feature ID of the feature that the idea was promoted to */
	featureId?: string,

	/* Initiative ID of the initiative that the idea was promoted to */
	initiativeId?: string,

	/* Epic ID of the epic that the idea was promoted to */
	epicId?: string,

	/* Idea ID for an idea which this idea duplicates. Setting this value will merge this idea into the provided idea ID; setting it to a null or blank value will unmerge this idea */
	duplicateIdeaId?: string,

	/* Number of votes to seed the vote count with when importing from other systems */
	initialVotes?: number,

	/* Initial visibility of the idea (aha, creator, employee, or public - aha is the default) */
	visibility?: string,

	/* Date of idea creation. In UTC timezone with format YYYY-MM-DD or YYYY-MM-DD HH:MM:SS. */
	createdAt?: string,

	/* Whether the idea is considered spam. Must be 'true' or 'false' */
	spam?: boolean,

	/* key value pair for custom field */
	customFields?: any
};

export const createIdea = (axios: AxiosInstance) => async ({
	productId,
	createdBy,
	name,
	description,
	workflowStatus,
	tags,
	categories,
	assignedToUser,
	featureId,
	initiativeId,
	epicId,
	duplicateIdeaId,
	initialVotes,
	visibility,
	createdAt,
	spam,
	customFields
}: CreateIdeaProps) =>
{
	const data: any = {
		product_id: productId,
		created_by: createdBy,
		name: name,
		description: description,
		workflow_status: workflowStatus,
		tags: tags,
		categories: categories,
		assigned_to_user: assignedToUser,
		feature: featureId,
		initiative: initiativeId,
		epic: epicId,
		duplicate_idea: duplicateIdeaId,
		initial_votes: initialVotes,
		visibility: visibility,
		createdAt: createdAt,
		spam: spam,
		custom_fields: customFields
	}

	const cleansedData = Object.keys(data).reduce((acc: any, key: string) =>
	{
		if (data[key] != null)
		{
			acc[key] = data[key];
		}
		return acc;
	}, {});

	return postData(axios, {
		url: `products/${productId}/ideas`,
		data: cleansedData
	});
};


export type UpdateIdeaProps = {

	/* Numeric ID or key of the product */
	ideaId: string,

	/* Email address of user that created the idea. The email address does not need to be for a user of Aha! */
	createdBy?: string,

	/* Name of the idea */
	name?: string,

	/* Description of the idea and it can include HTML formatting. */
	description?: string,

	/* Status of the idea and it must be one of the valid status values for the selected product. */
	workflowStatus?: string,

	/* Tags can be automatically assigned to the new idea. If more than one tag is used then tags should be separated by commas. */
	tags?: string,

	/* Names of the existing categories the idea should be assigned to. If more than one category is used then categories should be separated by commas. */
	categories?: string,

	/* Email address of user that is assigned the idea. */
	assignedToUser?: string,

	/* Feature ID of the feature that the idea was promoted to */
	featureId?: string,

	/* Initiative ID of the initiative that the idea was promoted to */
	initiativeId?: string,

	/* Epic ID of the epic that the idea was promoted to */
	epicId?: string,

	/* Idea ID for an idea which this idea duplicates. Setting this value will merge this idea into the provided idea ID; setting it to a null or blank value will unmerge this idea */
	duplicateIdeaId?: string,

	/* Number of votes to seed the vote count with when importing from other systems */
	initialVotes?: number,

	/* Initial visibility of the idea (aha, creator, employee, or public - aha is the default) */
	visibility?: string,

	/* Date of idea creation. In UTC timezone with format YYYY-MM-DD or YYYY-MM-DD HH:MM:SS. */
	createdAt?: string,

	/* Whether the idea is considered spam. Must be 'true' or 'false' */
	spam?: boolean,

	/* key value pair for custom field */
	customFields?: any
};

export const updateIdea = (axios: AxiosInstance) => async ({
	ideaId,
	createdBy,
	name,
	description,
	workflowStatus,
	tags,
	categories,
	assignedToUser,
	featureId,
	initiativeId,
	epicId,
	duplicateIdeaId,
	initialVotes,
	visibility,
	createdAt,
	spam,
	customFields
}: UpdateIdeaProps) =>
{
	const data: any = {
		created_by: createdBy,
		name: name,
		description: description,
		workflow_status: workflowStatus,
		tags: tags,
		categories: categories,
		assigned_to_user: assignedToUser,
		feature: featureId,
		initiative: initiativeId,
		epic: epicId,
		duplicate_idea: duplicateIdeaId,
		initial_votes: initialVotes,
		visibility: visibility,
		createdAt: createdAt,
		spam: spam,
		custom_fields: customFields
	}

	const cleansedData = Object.keys(data).reduce((acc: any, key: string) =>
	{
		if (data[key] != null)
		{
			acc[key] = data[key];
		}
		return acc;
	}, {});

	return putData(axios, {
		url: `ideas/${ideaId}`,
		data: {
			idea: cleansedData
		}
	});
}
