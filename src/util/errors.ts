export const returnError = (obj: any) =>
{
	return { error: obj.error || obj.err || "API Error" };
};

export const objectHasError = (obj: any) =>
{
	if (obj.error != null || obj.err != null)
	{
		return true;
	}

	return false;
};
