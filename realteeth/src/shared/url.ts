export const getQueryString = (params: Record<string, string | number | undefined>): string => {
  const queryString = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(
      ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number)}`
    )
    .join('&');
  return queryString ? `?${queryString}` : '';
};
