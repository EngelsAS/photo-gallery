import { useCallback, useEffect, useRef, useState } from "react";
import { divideArrayInThree } from "../utils/divide-array-in-three";
import { Basic } from "unsplash-js/dist/methods/photos/types";

type useLoadImagesProps = {
  fetchData: (
    page: number
  ) => Promise<
    | { type: "error"; error?: string }
    | { type: "success"; photos?: Basic[]; total?: number }
  >;
};

const useLoadImages = ({ fetchData }: useLoadImagesProps) => {
  const [photoColumns, setPhotoColumns] = useState<Basic[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [columnWidth, setColumnWidth] = useState(0);
  const heightOfEachColumn = useRef<number[]>([]);
  const [totalReached, setTotalReached] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const totalPages = useRef<number>(-1);

  const feedPage = useRef<number>(1);

  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (photoColumns.length > 0) {
      setIsLoading(false);
      feedPage.current += 1;
    }
  }, [photoColumns]);

  const addNewPhotosOnList = useCallback(
    (newItems: Basic[][]) => {
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
        }

        ///-------------------------------
        const distributedList = JSON.parse(
          JSON.stringify(photoColumns)
        ) as Basic[][];
        newItems.flat().forEach((item) => {
          const smallestColumnIndex = heightOfEachColumn.current.indexOf(
            Math.min(...heightOfEachColumn.current)
          );
          distributedList[smallestColumnIndex || 0].push(item);
          const newHeight = (item.height * columnWidth) / item.width;
          heightOfEachColumn.current[smallestColumnIndex || 0] += newHeight;
        });

        setPhotoColumns(distributedList);
      }
    },
    [columnWidth, photoColumns]
  );

  const fetchFeed = useCallback(async () => {
    setIsLoading(true);

    try {
      const resp = await fetchData(feedPage.current);

      if (resp.type === "success") {
        if (resp.total) {
          totalPages.current = Math.ceil(resp.total / 9);
        }

        if (feedPage.current > 1 && resp.photos) {
          resp.photos.shift();
        }

        if (resp.photos) {
          const splitedPhotos = divideArrayInThree(resp.photos);
          addNewPhotosOnList(splitedPhotos);
        }
      } else if (resp.error) {
        setError(resp.error);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("403");
    }
  }, [addNewPhotosOnList, fetchData]);

  const handleObserver = useCallback(() => {
    if (totalPages.current !== -1 && feedPage.current >= totalPages.current) {
      setTotalReached(true);
    }

    if (totalPages.current === -1 || feedPage.current <= totalPages.current) {
      fetchFeed();
    }
  }, [fetchFeed]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !isLoading) {
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
  }, [handleObserver, isLoading]);

  return {
    photoColumns,
    error,
    loadingRef,
    isLoading,
    totalReached,
    setColumnWidth,
  };
};

export default useLoadImages;
