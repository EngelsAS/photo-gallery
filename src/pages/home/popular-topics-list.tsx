import { Link } from "react-router";
import BorderedBox from "../../components/bordered-box";
import useLoadTopics from "../../hooks/useLoadTopics";

const PopularTopicsList = () => {
  const { topics, isLoading } = useLoadTopics();

  return (
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
            <Link to={`/topic/${item.slug}`} key={index}>
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
  );
};

export default PopularTopicsList;
