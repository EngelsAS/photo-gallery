import PhotoList from "../../components/photo-list";
import IntersectionDiv from "../../components/loading-card";
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import ReqLimitError from "../../components/req-limit-error";
import useLoadImages from "../../hooks/useLoadImages";
import { getQuery } from "../../api/query";

const SearchView = ({ query }: { query: string }) => {
  const {
    photoColumns: columns,
    loadingRef,
    error,
    totalReached,
    setColumnWidth,
  } = useLoadImages({
    fetchData: (page: number) => getQuery(query, page),
  });

  return (
    <>
      <div>
        <div className="max-w-7xl mx-auto my-10 font-bold text-3xl px-2 xl:px-0">
          <h2>{capitalizeFirstLetter(query || "")}</h2>
        </div>
        <div className="max-w-7xl mx-auto my-10 flex gap-3 flex-wrap md:flex-nowrap">
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
