import { Link, useParams } from "react-router";
import Avatar from "../../components/avatar";
import BorderedBox from "../../components/bordered-box";
import MainContainer from "../../components/main-container";
import useLoadCollection from "../../hooks/useLoadCollectionList";
import SkeletonLoading from "../../components/skeleton-loading";
import { LinkIcon } from "@heroicons/react/24/outline";
import PhotoList from "../../components/photo-list";
import IntersectionDiv from "../../components/loading-card";

const CollectionPage = () => {
  const { id } = useParams();

  const {
    collectionInfos,
    isLoading,
    photoColumns,
    handleObserver,
    loadingRef,
    totalReached,
    error,
  } = useLoadCollection({ id: id || "" });

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
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">
            {isLoading ? (
              <SkeletonLoading className="w-3xs h-10" />
            ) : (
              collectionInfos?.title
            )}
          </h1>
          <div className="flex gap-3 items-center">
            <Avatar src={collectionInfos?.user.profile_image.medium} />
            {isLoading ? (
              <SkeletonLoading className="h-5 w-20" />
            ) : (
              <p className="font-semibold">{collectionInfos?.user.name}</p>
            )}
          </div>
        </div>
        <div>
          <BorderedBox className="py-2 px-3 text-zinc-500 flex gap-2 cursor-pointer hover:text-black hover:border-black transition-colors shadow">
            <LinkIcon className="size-6" />

            <p className="font-semibold">Compartilhar</p>
          </BorderedBox>
        </div>
      </div>

      <div>
        {isLoading ? (
          <SkeletonLoading className="w-15 h-5" />
        ) : (
          <>{collectionInfos?.total_photos} imagens</>
        )}
      </div>
      <div className="flex gap-3 flex-wrap md:flex-nowrap">
        <PhotoList columns={photoColumns} observerFunction={handleObserver} />
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
      {!error && !totalReached && <IntersectionDiv ref={loadingRef} />}
    </MainContainer>
  );
};

export default CollectionPage;
