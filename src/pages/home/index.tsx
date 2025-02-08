import { Link } from "react-router";
import BorderedBox from "../../components/bordered-box";
import IntersectionDiv from "../../components/loading-card";
import PhotoList from "../../components/photo-list";
import useLoadPhotos from "../../hooks/useLoadPhotos";
import useLoadTopics from "../../hooks/useLoadTopics";
import CollectionList from "./collections-list";

const Home = () => {
  const { photoColumns, loadingRef, handleObserver } = useLoadPhotos({});
  const { topics, isLoading } = useLoadTopics();

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-10 mt-10">
      <div className="flex gap-5">
        <CollectionList />
        <BorderedBox className="hidden sm:block w-full ">
          <div className="py-3 px-5 flex flex-col gap-2">
            <p className="font-semibold">Tópicos populares</p>
            <div className="flex gap-3 flex-wrap">
              {isLoading && (
                <>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div
                      className="max-w-17 w-full h-6 bg-zinc-200 animate-pulse rounded-md"
                      key={index}
                    ></div>
                  ))}
                </>
              )}
              {topics.map((item, index) => (
                <Link to={`/topic/${item.slug}`}>
                  <BorderedBox
                    key={index}
                    className="flex px-2 py-1 hover:border-black text-zinc-500 hover:text-black transition-colors"
                  >
                    <p className="font-semibold ">{item.title}</p>
                  </BorderedBox>
                </Link>
              ))}
            </div>
          </div>
        </BorderedBox>
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
