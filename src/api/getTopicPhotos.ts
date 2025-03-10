import { PhotosResponse } from "../types/photos-response";
import { unsplash } from "./unsplash";

export const getTopicPhotos = async (slug: string, page: number) => {
  const resp = await unsplash.topics.getPhotos({
    topicIdOrSlug: slug,
    page: page,
    perPage: 9,
  });

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
    photos: photos,
    total: resp.response.total,
  } as PhotosResponse;
};
