import { Link } from "react-router";
import BorderedBox from "../../components/bordered-box";
import useLoadCollectionsList from "../../hooks/useLoadCollectionsList";
import Photo from "../../components/photo";
import { createSlug } from "../../utils/create-slug";

const CollectionList = () => {
  const { collectionsList, loadingList } = useLoadCollectionsList();

  return (
    <BorderedBox className="w-full">
      <div className="p-3">
        <p className="font-semibold px-2">Coleções</p>
        <div className="flex flex-col gap-2 mt-2">
          {loadingList && (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="flex gap-2 w-full p-2">
                  <div
                    key={index}
                    className="h-13 w-13 rounded-md bg-zinc-200 animate-pulse"
                  ></div>
                  <div className="flex flex-col gap-2">
                    <div className="w-15 h-3 bg-zinc-200 animate-pulse"></div>
                    <div className="w-8 h-2 bg-zinc-200 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </>
          )}
          {collectionsList.map((item, index) => (
            <Link
              key={index}
              to={`/collection/${item.id}/${createSlug(item.title)}`}
            >
              <div className="flex gap-2 w-full p-2 rounded-md hover:bg-zinc-100">
                <div className="h-13 w-13 rounded-md overflow-hidden">
                  <Photo
                    imageHeight={"52px"}
                    imageWidth={"52px"}
                    objectCover="cover"
                    data={item.cover_photo!}
                    imageSrc={item.cover_photo!.urls.small}
                  />
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-xs text-zinc-500">
                    {item.total_photos} imagens
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </BorderedBox>
  );
};

export default CollectionList;
