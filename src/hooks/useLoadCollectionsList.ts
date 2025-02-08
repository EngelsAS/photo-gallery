import { useEffect, useState } from "react";
import { getCollectionsList } from "../api/getCollectionsList";
import { Basic } from "unsplash-js/dist/methods/collections/types";

const useLoadCollectionsList = () => {
  const [collectionsList, setCollectionsList] = useState<Basic[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoadingList(true);
      const result = await getCollectionsList();

      if (result) {
        setCollectionsList(result.filter((item) => item.cover_photo));
      }

      setLoadingList(false);
    };

    fetchCollections();
  }, []);

  return { collectionsList, loadingList };
};

export default useLoadCollectionsList;
