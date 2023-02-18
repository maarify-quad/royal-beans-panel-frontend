export const getPaginatedURL = (
  url: string,
  pagination?: { page: number; limit: number },
  sorting?: { sortBy: string; order: "ASC" | "DESC" }
) => {
  const newURL = new URL(url, import.meta.env.VITE_API_BASE_URL);
  if (pagination) {
    const { page, limit } = pagination;
    newURL.searchParams.append("page", page.toString());
    newURL.searchParams.append("limit", limit.toString());
  }
  if (sorting) {
    const { sortBy, order } = sorting;
    newURL.searchParams.append("sortBy", sortBy);
    newURL.searchParams.append("order", order);
  }
  return newURL.toString();
};
