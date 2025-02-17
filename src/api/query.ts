import { PhotosResponse } from "../types/photos-response";
import { unsplash } from "./unsplash";

export const getQuery = async (query: string, page: number) => {
  const resp = await unsplash.search.getPhotos({
    query: query,
    page: page,
    perPage: 9,
    orderBy: "relevant",
  });
  console.log(resp);

  if (resp.type === "error") {
    return {
      type: "error",
      error: resp.errors[0],
    } as PhotosResponse;
  }

  const photos = resp.response.results.map((item) => ({
    ...item,
    urls: Object.fromEntries(
      Object.entries(item.urls).map(([key, url]) => [
        key,
        url.replace("fm=jpg", "fm=webp"),
      ])
    ),
  }));

  return {
    type: "success",
    total: resp.response.total,
    total_pages: resp.response.total_pages,
    photos: photos,
  } as PhotosResponse;
};
