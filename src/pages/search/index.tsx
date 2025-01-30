import { useParams } from "react-router";
import PhotoList from "../../components/photo-list";
import useLoadPhotos from "../../hooks/useLoadPhotos";

const Search = () => {
  const { query } = useParams();
  const { photoColumns: queryResults, loadingRefs } = useLoadPhotos({
    type: "query",
    query: query || "",
  });

  return (
    <div className="max-w-7xl mx-auto my-10 flex flex-col gap-3">
      <p className="font-semibold text-3xl uppercase ">{query}</p>
      <div className="max-w-7xl mx-auto my-10 flex gap-3">
        <PhotoList columns={queryResults} loadingRefs={loadingRefs} />
      </div>
    </div>
  );
};

export default Search;
