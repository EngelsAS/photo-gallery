import { useEffect, useRef, useState } from "react";
import { divideArrayInThree } from "../utils/divide-array-in-three";
import { getCollectionInfos } from "../api/getCollectionInfos";
import { getCollectionPhotos } from "../api/getCollectionPhotos";
import { Basic as BasicCollection } from "unsplash-js/dist/methods/collections/types";
import { Basic as BasicPhotos } from "unsplash-js/dist/methods/photos/types";

type useLoadCollectionProps = {
  id: string;
};

const useLoadCollection = ({ id }: useLoadCollectionProps) => {
  const [photoColumns, setPhotoColumns] = useState<BasicPhotos[][]>([]);
  const [collectionInfos, setCollectionInfos] = useState<BasicCollection>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFirstLoad = useRef(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const feedPage = useRef<number>(1);

  const loadingRef = useRef<HTMLDivElement>(null);

  const addNewPhotosOnList = (newItems: BasicPhotos[][]) => {
    if (photoColumns.length === 0) {
      setPhotoColumns(newItems);
    } else {
      const distributedList = JSON.parse(
        JSON.stringify(photoColumns)
      ) as BasicPhotos[][];
      newItems.flat().forEach((item) => {
        let minLengthColumIndex = 0;
        const columnsLength = distributedList.map((column, index) => ({
          index: index,
          length: column.length,
        }));
        columnsLength.sort((a, b) => a.length - b.length);
        minLengthColumIndex = columnsLength[0].index;
        distributedList[minLengthColumIndex].push(item);
      });
      setPhotoColumns(distributedList);
    }
  };

  useEffect(() => {
    fetchCollectionInfos();

    //eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (photoColumns.length > 0) {
      setIsLoading(false);
    }
  }, [photoColumns]);

  useEffect(() => {
    if (isLoading) {
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
      }
      fetchPhotos();
    } else if (!isFirstLoad.current) {
      feedPage.current += 1;
    }
    //eslint-disable-next-line
  }, [isLoading]);

  const handleObserver = () => {
    if (!isLoading) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          handleObserver();
        }
      },
      {
        rootMargin: "10%",
      }
    );

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    if (observerRef.current) {
      const observer = observerRef.current;
      return () => observer.disconnect();
    }

    //eslint-disable-next-line
  }, []);

  const fetchPhotos = async () => {
    const resp = await getCollectionPhotos(id, feedPage.current);
    console.log(resp);

    if (resp.photos) {
      if (feedPage.current > 1) {
        resp.photos.shift();
      }
      const splitedPhotos = divideArrayInThree(resp.photos);
      addNewPhotosOnList(splitedPhotos);
    } else if (resp.error) {
      setError(resp.error);
    }
  };

  const fetchCollectionInfos = async () => {
    const collectionInfos = await getCollectionInfos(id);

    if (collectionInfos) {
      setCollectionInfos(collectionInfos);
    }
  };

  return {
    photoColumns,
    collectionInfos,
    error,
    loadingRef,
    isLoading,
    handleObserver,
  };
};

export default useLoadCollection;
