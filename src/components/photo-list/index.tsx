import { Fragment } from "react/jsx-runtime";
import LoadingCard from "../loading-card";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { MutableRefObject } from "react";

interface PhotoListProps {
  columns: Basic[][];
  loadingRefs: MutableRefObject<HTMLDivElement[]>;
}

const PhotoList = ({ columns, loadingRefs }: PhotoListProps) => {
  return (
    <>
      {columns.map((internArray, indexMainArray) => (
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
    </>
  );
};

export default PhotoList;
