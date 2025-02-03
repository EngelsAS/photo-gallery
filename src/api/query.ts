import { PhotosResponse } from "../types/photos-response";
import { unsplash } from "./unsplash";

export const getQuery = async (query: string, page: number) => {
  const result = await unsplash.search.getPhotos({
    query: query,
    page: page,
    perPage: 9,
    orderBy: "relevant",
  });

  if (result.type === "error") {
    return {
      type: "error",
      error: result.errors[0],
    } as PhotosResponse;
  }

  return {
    type: "success",
    photos: result.response.results,
  } as PhotosResponse;
};
