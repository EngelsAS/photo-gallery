import { PhotosResponse } from "../types/photos-response";
import { unsplash } from "./unsplash";

export const getTopicPhotos = async (slug: string, page: number) => {
  const resp = await unsplash.topics.getPhotos({
    topicIdOrSlug: slug,
    page: page,
    perPage: 9,
  });

  console.log(resp);

  if (resp.type === "error") {
    return {
      type: "error",
      error: resp.errors[0],
    } as PhotosResponse;
  }

  return {
    type: "success",
    photos: resp.response.results,
    total: resp.response.total,
  } as PhotosResponse;
};
