import { useEffect, useState } from "react";
import { Basic as BasicCollection } from "unsplash-js/dist/methods/collections/types";
import { getCollectionInfos } from "../api/getCollectionInfos";

interface useCollectionPageProps {
  id: string;
}

const useCollectionPage = ({ id }: useCollectionPageProps) => {
  const [collectionInfos, setCollectionInfos] = useState<BasicCollection>();

  useEffect(() => {
    const fetchCollectionInfos = async () => {
      const collectionInfos = await getCollectionInfos(id);

      if (collectionInfos) {
        setCollectionInfos(collectionInfos);
      }
    };

    if (id) {
      fetchCollectionInfos();
    }
  }, [id]);

  return {
    collectionInfos,
  };
};

export default useCollectionPage;
