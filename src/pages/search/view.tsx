import PhotoList from "../../components/photo-list";
import useLoadPhotos from "../../hooks/useLoadPhotos";
import IntersectionDiv from "../../components/loading-card";
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter";
import {
  ArrowPathIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const SearchView = ({ query }: { query: string }) => {
  const {
    photoColumns: columns,
    loadingRef,
    handleObserver,
    error,
    totalReached,
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
        {error && (
          <div className="flex justify-center items-center gap-3">
            <ExclamationCircleIcon className="size-7" />
            <p>
              O limite de requisições por hora foi ultrapassado, este projeto
              foi feito apenas para fins educacionais e utiliza a versão de
              demonstraçao da Unplash API. Por favor, volte mais tarde.
            </p>
          </div>
        )}
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
