import {
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import IntersectionDiv from "../../components/loading-card";
import PhotoList from "../../components/photo-list";
import useLoadPhotos from "../../hooks/useLoadPhotos";
import CollectionList from "./collections-list";
import PopularTopicsList from "./popular-topics-list";
import ReqLimitError from "../../components/req-limit-error";
import { useEffect, useRef, useState } from "react";
import useIsScreenXs from "../../hooks/useIsScreenXs";

const Home = () => {
  const { photoColumns, loadingRef, error, setColumnWidth } = useLoadPhotos({});
  const [translated, setTranslated] = useState(false);
  const collectionsAndTopicsDivRef = useRef<HTMLDivElement | null>(null);
  const isXs = useIsScreenXs();

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
    <div className="max-w-7xl mx-auto flex flex-col gap-10 mt-10">
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
          className={`flex gap-5 min-w-[966px] px-2 xl:px-0 sm:w-full sm:min-w-auto transition-transform relative items-center`}
          ref={collectionsAndTopicsDivRef}
        >
          <CollectionList />
          <PopularTopicsList />
        </div>
      </div>

      <div className="flex gap-3 flex-wrap md:flex-nowrap">
        <PhotoList columns={photoColumns} setColumnWidth={setColumnWidth} />
      </div>
      {error && <ReqLimitError />}
      {!error && (
        <IntersectionDiv ref={loadingRef}>
          <ArrowPathIcon className="size-10 animate-spin text-zinc-500" />
        </IntersectionDiv>
      )}
    </div>
  );
};

export default Home;
