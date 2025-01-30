import { Fragment, useEffect, useRef, useState } from "react";
import { unsplash } from "../../api/unsplash";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import LoadingCard from "../../components/loading-card";
import { divideArrayInThree } from "../../utils/divide-array-in-three";

const Home = () => {
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

  return (
    <>
      <button onClick={() => console.log(loadingRefs.current)}>console</button>
      <div className="max-w-7xl mx-auto my-10 flex gap-3">
        {feedColumns.map((internArray, indexMainArray) => (
          <div
            className={`max-w-1/3 flex flex-col grow gap-3 `}
            key={indexMainArray}
          >
            {internArray.map((item, internArrayIndex, childArray) => (
              <Fragment key={internArrayIndex}>
                <img
                  className="w-full object-contain"
                  loading="lazy"
                  src={item.urls.regular}
                ></img>
                {internArrayIndex === childArray.length - 1 && (
                  <>
                    <LoadingCard
                      ref={(element) => {
                        if (element && !loadingRefs.current.includes(element)) {
                          loadingRefs.current.push(element);
                        }
                      }}
                      height={Math.ceil(Math.random() * (576 - 288) + 288)}
                    />
                  </>
                )}
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
