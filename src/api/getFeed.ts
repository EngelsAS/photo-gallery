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

  const photos = result.response.results.map((item) => ({
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
    photos: photos,
  } as PhotosResponse;
};
