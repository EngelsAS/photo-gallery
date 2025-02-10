import { unsplash } from "./unsplash";

export const getTopics = async () => {
  const resp = await unsplash.topics.list({ orderBy: "position" });

  if (resp.type === "success") {
    return resp.response.results;
  } else {
    console.log(resp.errors[0]);
    return;
  }
};
