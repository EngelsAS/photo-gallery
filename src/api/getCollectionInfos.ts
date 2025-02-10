import { Basic } from "unsplash-js/dist/methods/collections/types";
import { unsplash } from "./unsplash";

export const getCollectionInfos = async (id: string) => {
  const resp = await unsplash.collections.get({ collectionId: id });
  console.log(resp);

  if (resp.type === "success") {
    return resp.response as Basic;
  } else {
    console.log(resp.errors[0]);
    return;
  }
};
