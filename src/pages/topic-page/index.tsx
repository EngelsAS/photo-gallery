import { Link, useParams } from "react-router";
import BorderedBox from "../../components/bordered-box";
import MainContainer from "../../components/main-container";
import SkeletonLoading from "../../components/skeleton-loading";
import { LinkIcon } from "@heroicons/react/24/outline";
import PhotoList from "../../components/photo-list";
import IntersectionDiv from "../../components/loading-card";
import ReqLimitError from "../../components/req-limit-error";
import useLoadTopic from "../../hooks/useLoadTopic";

const TopicPage = () => {
  const { slug } = useParams();

  const {
    isLoading,
    photoColumns,
    loadingRef,
    totalReached,
    setColumnWidth,
    error,
    topicInfos,
  } = useLoadTopic({ slug: slug! });

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
      <div className="flex justify-between items-center">
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
        <div>
          <BorderedBox className="py-2 px-3 text-zinc-500 flex gap-2 cursor-pointer hover:text-black hover:border-black transition-colors shadow">
            <LinkIcon className="size-6" />

            <p className="font-semibold">Compartilhar</p>
          </BorderedBox>
        </div>
      </div>

      <div>
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
