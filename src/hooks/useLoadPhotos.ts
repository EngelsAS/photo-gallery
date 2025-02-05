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
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFirstLoad = useRef(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const feedPage = useRef<number>(1);

  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feedPage.current = 1;
    setPhotoColumns([]);
  }, [query]);

  const addNewPhotosOnList = (newItems: Basic[][]) => {
    if (photoColumns.length === 0) {
      setPhotoColumns(newItems);
    } else {
      setPhotoColumns((prev) =>
        prev.map((array, index) => [...array, ...newItems[index]])
      );
    }
  };

  useEffect(() => {
    if (photoColumns.length > 0) {
      setIsFetchingData(false);
    }
  }, [photoColumns]);

  useEffect(() => {
    console.log(isFetchingData);
  }, [isFetchingData]);

  useEffect(() => {
    if (isFetchingData) {
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
      }
      console.log("CHAMA É PRA CHAMAR CHAMA");
      fetchFeed();
    } else if (!isFirstLoad.current) {
      feedPage.current += 1;
    }
    //eslint-disable-next-line
  }, [isFetchingData]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !isFetchingData) {
          setIsFetchingData(true);
        }
      },
      {
        rootMargin: "50%",
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

    if (!query) {
      result = await getFeed(feedPage.current);
    } else {
      result = await getQuery(query, feedPage.current);
    }

    if (result.photos) {
      const splitedPhotos = divideArrayInThree(result.photos);
      addNewPhotosOnList(splitedPhotos);
    } else if (result.error) {
      setError(result.error);
    }
  };

  return {
    photoColumns,
    error,
    loadingRef,
  };
};

export default useLoadPhotos;
