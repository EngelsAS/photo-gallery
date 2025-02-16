import { ArrowPathIcon } from "@heroicons/react/24/outline";
import IntersectionDiv from "../../components/loading-card";
import PhotoList from "../../components/photo-list";
import ReqLimitError from "../../components/req-limit-error";
import PopularTopicsAndCollections from "./popular-topics-and-collections";
import useLoadImages from "../../hooks/useLoadImages";
import { getFeed } from "../../api/getFeed";

const Home = () => {
  const { photoColumns, loadingRef, error, setColumnWidth } = useLoadImages({
    fetchData: (page: number) => getFeed(page),
  });

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-10 mt-10">
      <PopularTopicsAndCollections />
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
