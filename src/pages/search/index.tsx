import { useParams } from "react-router";
import PhotoList from "../../components/photo-list";
import useLoadPhotos from "../../hooks/useLoadPhotos";
import IntersectionDiv from "../../components/loading-card";
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter";

const Search = () => {
  const { query } = useParams();
  const {
    photoColumns: columns,
    loadingRef,
    handleObserver,
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
          <PhotoList columns={columns} observerFunction={handleObserver} />
        </div>
        <IntersectionDiv
          ref={loadingRef}
          height={Math.ceil(Math.random() * (576 - 288) + 288)}
        />
      </div>
    </>
  );
};

export default Search;
