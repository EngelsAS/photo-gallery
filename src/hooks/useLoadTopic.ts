import { useEffect, useRef, useState } from "react";
import { divideArrayInThree } from "../utils/divide-array-in-three";
import { Basic as BasicPhotos } from "unsplash-js/dist/methods/photos/types";
import { getTopicPhotos } from "../api/getTopicPhotos";

type useLoadTopicProps = {
  slug: string;
};

const useLoadTopic = ({ slug }: useLoadTopicProps) => {
  const [photoColumns, setPhotoColumns] = useState<BasicPhotos[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [columnWidth, setColumnWidth] = useState(0);
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
          const height = column.reduce((acc, value) => {
            const newHeight = (value.height * columnWidth) / value.width;
            return (acc += newHeight);
          }, 0);

          heightOfEachColumn.current.push(height);
        });

        console.log(heightOfEachColumn.current);
      }

      ///-------------------------------
      const distributedList = JSON.parse(
        JSON.stringify(photoColumns)
      ) as BasicPhotos[][];
      newItems.flat().forEach((item) => {
        const smallestColumnIndex = heightOfEachColumn.current.indexOf(
          Math.min(...heightOfEachColumn.current)
        );
        distributedList[smallestColumnIndex || 0].push(item);
        const newHeight = (item.height * columnWidth) / item.width;
        heightOfEachColumn.current[smallestColumnIndex || 0] += newHeight;
      });
      console.log(distributedList);
      setPhotoColumns(distributedList);
    }
  };

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
        rootMargin: "1000px",
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
    const resp = await getTopicPhotos(slug, feedPage.current);

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

  return {
    photoColumns,
    error,
    loadingRef,
    isLoading,
    setColumnWidth,
    columnWidth,
    totalReached,
  };
};

export default useLoadTopic;
