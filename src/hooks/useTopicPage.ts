import { useEffect, useState } from "react";
import { Basic as BasicTopic } from "unsplash-js/dist/methods/topics/types";
import { getTopicInfos } from "../api/getTopicInfos";

interface useTopicPageProps {
  slug: string;
}

const useTopicPage = ({ slug }: useTopicPageProps) => {
  const [topicInfos, setTopicInfos] = useState<BasicTopic>();

  useEffect(() => {
    const fetchtopicInfos = async () => {
      const topicInfos = await getTopicInfos(slug);

      if (topicInfos) {
        setTopicInfos(topicInfos);
      }
    };
    if (slug) {
      fetchtopicInfos();
    }
  }, [slug]);

  return {
    topicInfos,
  };
};

export default useTopicPage;
