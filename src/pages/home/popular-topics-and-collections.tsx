import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import CollectionList from "./collections-list";
import PopularTopicsList from "./popular-topics-list";
import { useEffect, useRef, useState } from "react";
import useIsScreenXs from "../../hooks/useIsScreenXs";

const PopularTopicsAndCollections = () => {
  const [translated, setTranslated] = useState(false);
  const collectionsAndTopicsDivRef = useRef<HTMLDivElement | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const isXs = useIsScreenXs();

  useEffect(() => {
    setWindowWidth(window.innerWidth * 2 - 20 - 16);

    const onResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width * 2 - 20 - 16);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleClickSetaIr = () => {
    if (collectionsAndTopicsDivRef.current) {
      const parentWidth =
        collectionsAndTopicsDivRef.current.parentElement?.offsetWidth || 0;
      const divWidth = collectionsAndTopicsDivRef.current.offsetWidth;

      const maxTranslate = Math.max(0, divWidth - parentWidth);

      collectionsAndTopicsDivRef.current.style.transform = `translateX(-${maxTranslate}px)`;

      setTranslated(true);
    }
  };

  const handleClickSetaVoltar = () => {
    if (collectionsAndTopicsDivRef.current) {
      collectionsAndTopicsDivRef.current.style.transform = `translateX(0)`;
      setTranslated(false);
    }
  };

  useEffect(() => {
    if (!isXs && collectionsAndTopicsDivRef.current) {
      collectionsAndTopicsDivRef.current.style.transform = `translateX(0)`;
      setTranslated(false);
    }
  }, [isXs]);

  return (
    <div className="w-full relative flex items-center overflow-hidden">
      <button
        onClick={handleClickSetaVoltar}
        className={`sm:hidden cursor-pointer absolute left-2 z-10 bg-zinc-100 p-2 rounded-full shadow hover:bg-white transition-colors ${
          translated ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronLeftIcon className="size-6" />
      </button>
      <button
        onClick={handleClickSetaIr}
        className={`sm:hidden cursor-pointer absolute right-2 z-10 bg-zinc-100 p-2 rounded-full shadow hover:bg-white transition-colors ${
          !translated ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronRightIcon className="size-6" />
      </button>

      <div
        className={`flex gap-5 px-2 xl:px-0 sm:w-full transition-transform relative items-center`}
        style={{
          minWidth: isXs ? `${windowWidth}px` : "10px",
        }}
        ref={collectionsAndTopicsDivRef}
      >
        <CollectionList />
        <PopularTopicsList />
      </div>
    </div>
  );
};

export default PopularTopicsAndCollections;
