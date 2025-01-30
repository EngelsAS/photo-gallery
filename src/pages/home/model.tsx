import { useEffect, useRef, useState } from "react";
import { unsplash } from "../../api/unsplash";
import { divideArrayInThree } from "../../utils/divide-array-in-three";
import { Basic } from "unsplash-js/dist/methods/photos/types";

const useFeedModel = () => {
  const [feedColumns, setFeedColumns] = useState<Basic[][]>([]);
  const isFetchingData = useRef<boolean>(false);

  const feedPage = useRef<number>(1);

  const loadingRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    fetchFeed();

    //eslint-disable-next-line
  }, []);

  const addNewPhotosOnFeed = (newItems: Basic[][]) => {
    if (feedColumns.length === 0) {
      setFeedColumns(newItems);
    } else {
      setFeedColumns((prev) =>
        prev.map((array, index) => [...array, ...newItems[index]])
      );
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries.some((entry) => entry.isIntersecting) &&
          !isFetchingData.current
        ) {
          console.log("ue");
          fetchFeed();
        }
      },
      {
        rootMargin: "50%",
      }
    );

    if (loadingRefs.current.length > 0) {
      loadingRefs.current.forEach((ref) => {
        observer.observe(ref);
      });
    }

    return () => observer.disconnect();

    //eslint-disable-next-line
  }, [feedColumns]);

  const fetchFeed = () => {
    console.log("opa");

    isFetchingData.current = true;
    unsplash.photos
      .list({ perPage: 15, page: feedPage.current })
      .then((result) => {
        console.log("\n\n fetchFeed");
        if (result.errors) {
          console.log("error: ", result.errors[0]);
        } else {
          feedPage.current += 1;

          const photos = result.response.results;
          const splitedPhotos = divideArrayInThree(photos);

          addNewPhotosOnFeed(splitedPhotos);
        }

        isFetchingData.current = false;
      });

    // setIsFetchingData(false);
  };

  return {
    feedColumns,
    loadingRefs,
  };
};

export default useFeedModel;
