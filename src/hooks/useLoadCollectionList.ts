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
  const [totalReached, setTotalReached] = useState(false);
  const totalPages = useRef<number>(-1);
  const heightOfEachColumn = useRef<number[]>([]);

  const feedPage = useRef<number>(1);

  const loadingRef = useRef<HTMLDivElement>(null);

  const addNewPhotosOnList = (newItems: BasicPhotos[][]) => {
    if (photoColumns.length === 0) {
      setPhotoColumns(newItems);
    } else {
      if (heightOfEachColumn.current.length === 0) {
        photoColumns.forEach((column) => {
          const height = column.reduce(
            (acc, value) => (acc += value.height),
            0
          );

          heightOfEachColumn.current.push(height);
        });

        console.log(heightOfEachColumn.current);
      }

      ///-------------------------------
      const distributedList = JSON.parse(
        JSON.stringify(photoColumns)
      ) as BasicPhotos[][];
      newItems.flat().forEach((item) => {
        console.log("array de altura das colunas");
        console.log(heightOfEachColumn.current);
        const smallestColumnIndex = heightOfEachColumn.current.indexOf(
          Math.min(...heightOfEachColumn.current)
        );
        console.log("indice com a menor altura");
        console.log(smallestColumnIndex);
        distributedList[smallestColumnIndex || 0].push(item);
        heightOfEachColumn.current[smallestColumnIndex || 0] += item.height;
      });
      console.log(distributedList);
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
    if (totalPages.current !== -1 && feedPage.current >= totalPages.current) {
      setTotalReached(true);
    }

    if (totalPages.current === -1 || feedPage.current <= totalPages.current) {
      if (!isLoading) {
        setIsLoading(true);
      }
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

    if (resp.photos) {
      if (resp.total) {
        totalPages.current = Math.ceil(resp.total / 9);
      }

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
    totalReached,
    handleObserver,
  };
};

export default useLoadCollection;
