import { PhotosResponse } from "../types/photos-response";
import { unsplash } from "./unsplash";

export const getQuery = async (query: string, page: number) => {
  const result = await unsplash.search.getPhotos({
    query: query,
    page: page,
    perPage: 9,
    orderBy: "relevant",
  });
  console.log(result);

  if (result.type === "error") {
    return {
      type: "error",
      error: result.errors[0],
    } as PhotosResponse;
  }

  return {
    type: "success",
    total: result.response.total,
    total_pages: result.response.total_pages,
    photos: result.response.results,
  } as PhotosResponse;
};
