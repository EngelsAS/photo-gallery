import { useCallback, useEffect, useRef, useState } from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { divideArrayInThree } from "../utils/divide-array-in-three";
import { getFeed } from "../api/getFeed";
import { getQuery } from "../api/query";
import { PhotosResponse } from "../types/photos-response";

type useLoadPhotosProps = {
  query?: string;
};

const useLoadPhotos = ({ query }: useLoadPhotosProps) => {
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

    let result: PhotosResponse;
    try {
      if (!query) {
        result = await getFeed(feedPage.current);
      } else {
        result = await getQuery(query, feedPage.current);
      }

      if (result.photos) {
        if (query) {
          totalPages.current = result.total_pages || 0;
        }
        if (feedPage.current > 1) {
          result.photos.shift();
        }
        const splitedPhotos = divideArrayInThree(result.photos);
        addNewPhotosOnList(splitedPhotos);
      } else if (result.error) {
        setError(result.error);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("403");
    }
  }, [addNewPhotosOnList, query]);

  const handleObserver = useCallback(() => {
    if (totalPages.current !== -1 && feedPage.current >= totalPages.current) {
      setTotalReached(true);
    }

    if (
      !query ||
      totalPages.current === -1 ||
      feedPage.current <= totalPages.current
    ) {
      fetchFeed();
    }
  }, [fetchFeed, query]);

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

export default useLoadPhotos;
