import { Basic } from "unsplash-js/dist/methods/topics/types";
import { unsplash } from "./unsplash";

export const getTopicInfos = async (slug: string) => {
  const resp = await unsplash.topics.get({ topicIdOrSlug: slug });
  console.log(resp);

  if (resp.type === "success") {
    return resp.response as Basic;
  } else {
    console.log(resp.errors[0]);
    return;
  }
};
