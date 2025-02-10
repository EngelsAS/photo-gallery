import { useEffect, useRef, useState } from "react";
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
  const [totalReached, setTotalReached] = useState(false);
  const totalPhotos = useRef<number>(-1);
  const isFirstLoad = useRef(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const totalPages = useRef<number>(-1);

  const feedPage = useRef<number>(1);

  const loadingRef = useRef<HTMLDivElement>(null);

  const addNewPhotosOnList = (newItems: Basic[][]) => {
    if (photoColumns.length === 0) {
      setPhotoColumns(newItems);
    } else {
      const distributedList = JSON.parse(
        JSON.stringify(photoColumns)
      ) as Basic[][];
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
    if (photoColumns.length > 0) {
      setIsLoading(false);
    }
  }, [photoColumns]);

  useEffect(() => {
    if (isLoading) {
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
      }
      fetchFeed();
    } else if (!isFirstLoad.current) {
      feedPage.current += 1;
    }
    //eslint-disable-next-line
  }, [isLoading]);

  const handleObserver = () => {
    if (totalPages.current !== -1 && feedPage.current >= totalPages.current) {
      setTotalReached(true);
    }

    if (
      !query ||
      totalPages.current === -1 ||
      feedPage.current <= totalPages.current
    ) {
      console.log("ta vindo pra cá né?");
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

  const fetchFeed = async () => {
    let result: PhotosResponse;
    try {
      if (!query) {
        result = await getFeed(feedPage.current);
      } else {
        result = await getQuery(query, feedPage.current);
      }

      if (result.photos) {
        console.log("entao ta vindo pra ca tbm");
        if (query) {
          totalPhotos.current = result.total || 0;
          totalPages.current = result.total_pages || 0;
        }
        if (feedPage.current > 1) {
          result.photos.shift();
        }
        const splitedPhotos = divideArrayInThree(result.photos);
        addNewPhotosOnList(splitedPhotos);
      } else if (result.error) {
        setIsLoading(false);
        setError(result.error);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("403");
    }
  };

  return {
    photoColumns,
    error,
    loadingRef,
    isLoading,
    totalReached,
    handleObserver,
  };
};

export default useLoadPhotos;
