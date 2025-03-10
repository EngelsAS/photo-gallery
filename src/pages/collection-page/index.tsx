import { Link, useParams } from "react-router";
import Avatar from "../../components/avatar";
import MainContainer from "../../components/main-container";
import SkeletonLoading from "../../components/skeleton-loading";
import { LinkIcon } from "@heroicons/react/24/outline";
import PhotoList from "../../components/photo-list";
import IntersectionDiv from "../../components/loading-card";
import ReqLimitError from "../../components/req-limit-error";
import useCollectionPage from "../../hooks/useCollectionPage";
import useLoadImages from "../../hooks/useLoadImages";
import { getCollectionPhotos } from "../../api/getCollectionPhotos";
import ShareButton from "../../components/share-button";

const CollectionPage = () => {
  const { id } = useParams();

  const { collectionInfos } = useCollectionPage({
    id: id!,
  });

  const {
    isLoading,
    photoColumns,
    loadingRef,
    totalReached,
    setColumnWidth,
    error,
  } = useLoadImages({
    fetchData: (page: number) => getCollectionPhotos(id!, page),
  });

  if (!id) {
    return (
      <div>
        Ocorreu um erro ao buscar essa coleção{" "}
        <Link to={"/"}>Voltar ao inicio</Link>
      </div>
    );
  }

  return (
    <MainContainer>
      <div className="flex justify-between items-center px-2 xl:px-0">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">
            {isLoading && !collectionInfos ? (
              <SkeletonLoading className="w-3xs h-10" />
            ) : (
              collectionInfos?.title
            )}
          </h1>
          <div className="flex gap-3 items-center">
            <Avatar src={collectionInfos?.user.profile_image.medium} />
            {isLoading && !collectionInfos ? (
              <SkeletonLoading className="h-5 w-20" />
            ) : (
              <p className="font-semibold">{collectionInfos?.user.name}</p>
            )}
          </div>
        </div>

        <ShareButton url={window.location.href}>
          <div className="flex gap-2 items-center p-2">
            <LinkIcon className="size-7" />

            <p className="font-semibold">Compartilhar</p>
          </div>
        </ShareButton>
      </div>

      <div className="px-2 xl:px-0">
        {isLoading && !collectionInfos ? (
          <SkeletonLoading className="w-15 h-5" />
        ) : (
          <>{collectionInfos?.total_photos} imagens</>
        )}
      </div>
      <div className="flex gap-3 flex-wrap md:flex-nowrap">
        <PhotoList columns={photoColumns} setColumnWidth={setColumnWidth} />
      </div>
      <div>
        {collectionInfos?.user.name.includes("Unsplash+") &&
          !isLoading &&
          photoColumns[0].length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-center">
                Esta coleção faz parte do catálogo de coleções exclusivas da
                plataforma oficial Unsplash e pode ser acessada apenas pelo site
                oficial
              </h4>

              <a
                href={`https://unsplash.com/pt-br/cole%C3%A7%C3%B5es/${id}`}
                target="_blank"
                className="underline text-cyan-600"
                title={`https://unsplash.com/pt-br/cole%C3%A7%C3%B5es/${id}`}
              >
                unsplash.com
              </a>
            </div>
          )}
      </div>
      {error && <ReqLimitError />}
      {!error && !totalReached && <IntersectionDiv ref={loadingRef} />}
    </MainContainer>
  );
};

export default CollectionPage;
