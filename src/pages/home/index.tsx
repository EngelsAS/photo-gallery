import IntersectionDiv from "../../components/loading-card";
import PhotoList from "../../components/photo-list";
import useLoadPhotos from "../../hooks/useLoadPhotos";
import CollectionList from "./collections-list";
import PopularTopicsList from "./popular-topics-list";

const Home = () => {
  const { photoColumns, loadingRef, handleObserver } = useLoadPhotos({});

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-10 mt-10">
      <div className="flex gap-5">
        <CollectionList />
        <PopularTopicsList />
      </div>
      <div className="flex gap-3 flex-wrap md:flex-nowrap">
        <PhotoList columns={photoColumns} observerFunction={handleObserver} />
      </div>
      <IntersectionDiv
        ref={loadingRef}
        height={Math.ceil(Math.random() * (576 - 288) + 288)}
      />
    </div>
  );
};

export default Home;
