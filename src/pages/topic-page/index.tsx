import { Link, useParams } from "react-router";
import MainContainer from "../../components/main-container";
import SkeletonLoading from "../../components/skeleton-loading";
import { LinkIcon } from "@heroicons/react/24/outline";
import PhotoList from "../../components/photo-list";
import IntersectionDiv from "../../components/loading-card";
import ReqLimitError from "../../components/req-limit-error";
import useTopicPage from "../../hooks/useTopicPage";
import useLoadImages from "../../hooks/useLoadImages";
import { getTopicPhotos } from "../../api/getTopicPhotos";
import ShareButton from "../../components/share-button";

const TopicPage = () => {
  const { slug } = useParams();

  const { topicInfos } = useTopicPage({ slug: slug! });

  const {
    isLoading,
    photoColumns,
    loadingRef,
    totalReached,
    setColumnWidth,
    error,
  } = useLoadImages({
    fetchData: (page: number) => getTopicPhotos(slug!, page),
  });

  if (!slug) {
    return (
      <div>
        Ocorreu um erro ao buscar esse tópico{" "}
        <Link to={"/"}>Voltar ao inicio</Link>
      </div>
    );
  }

  return (
    <MainContainer>
      <div className="flex justify-between items-center px-2 xl:px-0">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">
            {isLoading && !topicInfos ? (
              <SkeletonLoading className="w-3xs h-10" />
            ) : (
              topicInfos?.title
            )}
          </h1>
          <div className="flex gap-3 items-center">
            {isLoading ? (
              <SkeletonLoading className="w-xs h-4" />
            ) : (
              <p>Selecionadas por Unsplash</p>
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
        {isLoading && !topicInfos ? (
          <SkeletonLoading className="w-15 h-5" />
        ) : (
          <>{topicInfos?.total_photos} imagens</>
        )}
      </div>
      <div className="flex gap-3 flex-wrap md:flex-nowrap">
        <PhotoList columns={photoColumns} setColumnWidth={setColumnWidth} />
      </div>

      {error && <ReqLimitError />}
      {!error && !totalReached && <IntersectionDiv ref={loadingRef} />}
    </MainContainer>
  );
};

export default TopicPage;
