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

  return {
    type: "success",
    photos: resp.response.results,
  } as PhotosResponse;
};
