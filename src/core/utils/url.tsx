export function convertSearchParamsToObject(searchParams: URLSearchParams) {
  const result: Record<string, unknown> = {};

  for (const [key, value] of searchParams.entries()) {
    result[key] = value;
  }

  return result;
}
