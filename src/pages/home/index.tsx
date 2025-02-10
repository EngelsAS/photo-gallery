import {
  ArrowPathIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import IntersectionDiv from "../../components/loading-card";
import PhotoList from "../../components/photo-list";
import useLoadPhotos from "../../hooks/useLoadPhotos";
import CollectionList from "./collections-list";
import PopularTopicsList from "./popular-topics-list";

const Home = () => {
  const { photoColumns, loadingRef, handleObserver, error } = useLoadPhotos({});

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-10 mt-10">
      <div className="flex gap-5">
        <CollectionList />
        <PopularTopicsList />
      </div>
      <div className="flex gap-3 flex-wrap md:flex-nowrap">
        <PhotoList columns={photoColumns} observerFunction={handleObserver} />
      </div>
      {error && (
        <div className="flex justify-center items-center gap-3">
          <ExclamationCircleIcon className="size-7" />
          <p>
            O limite de requisições por hora foi ultrapassado, este projeto foi
            feito apenas para fins educacionais e utiliza a versão de
            demonstraçao da Unplash API. Por favor, volte mais tarde.
          </p>
        </div>
      )}
      {!error && (
        <IntersectionDiv ref={loadingRef}>
          <ArrowPathIcon className="size-10 animate-spin text-zinc-500" />
        </IntersectionDiv>
      )}
    </div>
  );
};

export default Home;
