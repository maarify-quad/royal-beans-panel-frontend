export const getPaginatedURL = (url: string, pagination?: { page: number; limit: number }) => {
  const newURL = new URL(url, import.meta.env.VITE_API_BASE_URL);
  if (pagination) {
    const { page, limit } = pagination;
    newURL.searchParams.append("page", page.toString());
    newURL.searchParams.append("limit", limit.toString());
  }
  return newURL.toString();
};
