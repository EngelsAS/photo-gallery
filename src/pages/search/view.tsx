import PhotoList from "../../components/photo-list";
import useLoadPhotos from "../../hooks/useLoadPhotos";
import IntersectionDiv from "../../components/loading-card";
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import ReqLimitError from "../../components/req-limit-error";

const SearchView = ({ query }: { query: string }) => {
  const {
    photoColumns: columns,
    loadingRef,
    error,
    totalReached,
    setColumnWidth,
  } = useLoadPhotos({
    query: query || "",
  });

  return (
    <>
      <div>
        <div className="max-w-7xl mx-auto my-10 font-bold text-3xl">
          <h2>{capitalizeFirstLetter(query || "")}</h2>
        </div>
        <div className="max-w-7xl mx-auto my-10 flex gap-3">
          <PhotoList columns={columns} setColumnWidth={setColumnWidth} />
        </div>
        {error && <ReqLimitError />}
        {!error && !totalReached && (
          <IntersectionDiv ref={loadingRef}>
            <ArrowPathIcon className="size-10 animate-spin text-zinc-500" />
          </IntersectionDiv>
        )}
      </div>
    </>
  );
};

export default SearchView;
