import { Basic } from "unsplash-js/dist/methods/photos/types";
import { PhotosResponse } from "../types/photos-response";
import { unsplash } from "./unsplash";

export const getCollectionPhotos = async (id: string, page: number) => {
  const resp = await unsplash.collections.getPhotos({
    collectionId: id,
    page: page,
    perPage: 9,
  });

  if (resp.type === "error") {
    return {
      type: "error",
      error: resp.errors[0],
    } as PhotosResponse;
  }

  const photos = (resp.response.results as Basic[]).map((item) => ({
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
    total: resp.response.total,
  } as PhotosResponse;
};
