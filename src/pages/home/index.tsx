import PhotoList from "../../components/photo-list";
import useLoadPhotos from "../../hooks/useLoadPhotos";

const Home = () => {
  const { photoColumns, loadingRefs } = useLoadPhotos({ type: "feed" });

  return (
    <>
      <div className="max-w-7xl mx-auto my-10 flex gap-3">
        <PhotoList columns={photoColumns} loadingRefs={loadingRefs} />
      </div>
    </>
  );
};

export default Home;
