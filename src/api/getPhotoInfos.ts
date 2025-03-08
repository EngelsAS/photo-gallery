import { unsplash } from "./unsplash";
import { Full } from "unsplash-js/dist/methods/photos/types";

export const getPhotoInfos = async (id: string) => {
  const result = await unsplash.photos.get({ photoId: id });

  if (result.type === "error") {
    return;
  }

  const photoInfos: Full = {
    ...result.response,
    urls: Object.fromEntries(
      Object.entries(result.response.urls).map(([key, url]) => [
        key,
        url.replace("fm=jpg", "fm=webp"),
      ])
    ) as Full["urls"],
  };

  if (result.type === "success") {
    return photoInfos;
  }

  return;
};
