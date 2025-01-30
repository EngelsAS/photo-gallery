import { Fragment } from "react";
import LoadingCard from "../../components/loading-card";
import useFeedModel from "./model";

const Home = () => {
  const { feedColumns, loadingRefs } = useFeedModel();

  return (
    <>
      <button onClick={() => console.log(loadingRefs.current)}>console</button>
      <div className="max-w-7xl mx-auto my-10 flex gap-3">
        {feedColumns.map((internArray, indexMainArray) => (
          <div
            className={`max-w-1/3 flex flex-col grow gap-3 `}
            key={indexMainArray}
          >
            {internArray.map((item, internArrayIndex, childArray) => (
              <Fragment key={internArrayIndex}>
                <img
                  className="w-full object-contain"
                  loading="lazy"
                  src={item.urls.regular}
                ></img>
                {internArrayIndex === childArray.length - 1 && (
                  <>
                    <LoadingCard
                      ref={(element) => {
                        if (element && !loadingRefs.current.includes(element)) {
                          loadingRefs.current.push(element);
                        }
                      }}
                      height={Math.ceil(Math.random() * (576 - 288) + 288)}
                    />
                  </>
                )}
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
