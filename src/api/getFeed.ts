import { PhotosResponse } from "../types/photos-response";
import { unsplash } from "./unsplash";

export const getFeed = async (page: number) => {
  const result = await unsplash.photos.list({ perPage: 9, page: page });

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
