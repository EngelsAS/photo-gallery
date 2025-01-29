import { useEffect, useRef, useState } from "react";
import { unsplash } from "../../api/unsplash";
import { Basic } from "unsplash-js/dist/methods/photos/types";

const divideArrayInThree = <T,>(arr: T[]) => {
  const partSize = Math.ceil(arr.length / 3); // Tamanho de cada parte
  const firstPart = arr.slice(0, partSize);
  const secondPart = arr.slice(partSize, partSize * 2);
  const thirdPart = arr.slice(partSize * 2);

  return [firstPart, secondPart, thirdPart];
};

// const heights = Array.from({ length: 15 }, () =>
//   Math.floor(Math.random() * (500 - 300) + 300)
// );

// const dividedHeights = divideArrayInThree(heights);

const Home = () => {
  //   const [testArray, setTestArray] = useState(heights);

  //   const feedColumnsTest = useMemo(() => {
  //     const array = divideArrayInThree(testArray);
  //     return array;
  //   }, [testArray]);

  const [feedColumns, setFeedColumns] = useState<Basic[][]>([]);

  const [isFetchingData, setIsFetchingData] = useState(false);

  const isFirstRender = useRef<boolean>(true);

  const feedPage = useRef<number>(1);

  const onScroll = () => {
    const maxScrollY =
      document.documentElement.scrollHeight - window.innerHeight;

    const currentScrollY = Math.ceil(window.scrollY);

    if (!isFetchingData && currentScrollY >= maxScrollY - 1500) {
      setIsFetchingData(true);
    }
  };

  useEffect(() => {
    if (isFetchingData || isFirstRender.current) {
      fetchFeed();

      if (isFirstRender.current) {
        isFirstRender.current = false;
      }
    }

    //eslint-disable-next-line
  }, [isFetchingData]);

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
    document.addEventListener("scroll", onScroll);

    return () => document.removeEventListener("scroll", onScroll);

    //eslint-disable-next-line
  }, []);

  const fetchFeed = () => {
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

        setIsFetchingData(false);
      });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto my-10 flex gap-3">
        {feedColumns.map((internArray, index) => (
          <div className={`max-w-1/3 flex flex-col grow gap-3 `} key={index}>
            {internArray.map((item, internArrayIndex) => (
              <img
                key={internArrayIndex}
                className="w-full object-contain"
                loading="lazy"
                src={item.urls.regular}
              ></img>
            ))}
          </div>
        ))}
      </div>
      {isFetchingData && <div className="text-center">FETCHANDO</div>}
    </>
  );
};

export default Home;
