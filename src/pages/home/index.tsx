import IntersectionDiv from "../../components/loading-card";
import PhotoList from "../../components/photo-list";
import useLoadPhotos from "../../hooks/useLoadPhotos";

const Home = () => {
  const { photoColumns, loadingRef } = useLoadPhotos({});

  return (
    <>
      <div className="max-w-7xl mx-auto my-10 flex gap-3 flex-wrap md:flex-nowrap">
        <PhotoList columns={photoColumns} />
      </div>
      <IntersectionDiv
        ref={loadingRef}
        height={Math.ceil(Math.random() * (576 - 288) + 288)}
      />
    </>
  );
};

export default Home;
