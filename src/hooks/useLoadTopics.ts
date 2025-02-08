import { useEffect, useState } from "react";
import { getTopics } from "../api/getTopics";
import { Basic } from "unsplash-js/dist/methods/topics/types";

const useLoadTopics = () => {
  const [topics, setTopics] = useState<Basic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true);
      const result = await getTopics();

      if (result) {
        setTopics(result);
      }

      setIsLoading(false);
    };

    fetchTopics();
  }, []);

  return {
    topics,
    isLoading,
  };
};

export default useLoadTopics;
