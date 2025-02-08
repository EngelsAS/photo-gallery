import { Basic } from "unsplash-js/dist/methods/collections/types";
import { unsplash } from "./unsplash";

export const getCollectionsList = async (perPage: number = 4) => {
  const resp = await unsplash.collections.list({ page: 1, perPage: perPage });
  console.log(resp);

  if (resp.type === "success") {
    return resp.response.results as Basic[];
  } else {
    console.log(resp.errors[0]);
    return;
  }
};
