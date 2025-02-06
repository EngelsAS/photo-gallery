import { unsplash } from "./unsplash";

export const getPhotoInfos = async (id: string) => {
  const result = await unsplash.photos.get({ photoId: id });

  if (result.type === "error") {
    return;
  }

  if (result.type === "success") {
    return result.response;
  }

  return;
};
