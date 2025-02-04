import { useEffect, useRef, useState } from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { divideArrayInThree } from "../utils/divide-array-in-three";
import { getFeed } from "../api/getFeed";
import { getQuery } from "../api/query";
import { PhotosResponse } from "../types/photos-response";

type useLoadPhotosProps =
  | {
      type: "feed";
    }
  | {
      type: "query";
      query: string;
    };

const useLoadPhotos = (props: useLoadPhotosProps) => {
  const [photoColumns, setPhotoColumns] = useState<Basic[][]>([]);
  const [error, setError] = useState<string | null>(null);
  const isFetchingData = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const feedPage = useRef<number>(1);

  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchFeed();

    //eslint-disable-next-line
  }, []);

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
    console.log(photoColumns);
  }, [photoColumns]);

  useEffect(() => {
    if (!loadingRef.current) return;

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (
            entries.some((entry) => entry.isIntersecting) &&
            !isFetchingData.current
          ) {
            fetchFeed();
          }
        },
        {
          rootMargin: "50%",
        }
      );
    }

    if (loadingRef.current && observerRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    if (observerRef.current) {
      const observer = observerRef.current;
      return () => observer.disconnect();
    }

    //eslint-disable-next-line
  }, [photoColumns]);

  const fetchFeed = async () => {
    isFetchingData.current = true;
    console.log("\n\n tem um fiddle nos cabos");
    let result: PhotosResponse;

    if (props.type === "feed") {
      result = await getFeed(feedPage.current);
    } else {
      result = await getQuery(props.query, feedPage.current);
    }

    if (result.error) {
      setError(result.error);
    } else if (result.photos) {
      const splitedPhotos = divideArrayInThree(result.photos);
      addNewPhotosOnList(splitedPhotos);
    }

    feedPage.current += 1;
    isFetchingData.current = false;
  };

  return {
    photoColumns,
    error,
    loadingRef,
  };
};

export default useLoadPhotos;
