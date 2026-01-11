export function getQueryString(
  params: Record<string, string | number | undefined | boolean>
): string {
  const queryString = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number | boolean)}`
    )
    .join('&');
  return queryString ? `?${queryString}` : '';
}
