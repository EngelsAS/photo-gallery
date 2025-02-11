import { Basic } from "unsplash-js/dist/methods/photos/types";
import Photo from "../photo";
import { Link, useLocation } from "react-router";
import PhotoUsernameHover from "../photo-username-hover";
import { Dispatch, Fragment, SetStateAction, useEffect, useRef } from "react";

interface PhotoListProps {
  columns: Basic[][];
  setColumnWidth: Dispatch<SetStateAction<number>>;
}

const PhotoList = ({ columns, setColumnWidth }: PhotoListProps) => {
  const location = useLocation();
  const columnRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (columnRef.current && setColumnWidth) {
      console.log("loop");
      setColumnWidth(columnRef.current?.offsetWidth);
    }
  }, [columns, setColumnWidth]);

  const handleResizeColumn = () => {
    if (setColumnWidth && columnRef.current) {
      setColumnWidth(columnRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    if (resizeRef.current) {
      resizeRef.current.disconnect();
    }

    resizeRef.current = new ResizeObserver(handleResizeColumn);

    if (columnRef.current) {
      resizeRef.current.observe(columnRef.current);
    }

    return () => {
      if (resizeRef.current) {
        resizeRef.current.disconnect();
      }
    };

    //eslint-disable-next-line
  }, [columns]);

  return (
    <>
      {columns.map((internArray, indexMainArray) => (
        <div
          className={`flex flex-col w-full gap-3 md:max-w-[418px]`}
          ref={columnRef}
          key={indexMainArray}
        >
          {internArray.map((item, internArrayIndex) => (
            <Fragment key={internArrayIndex}>
              <Link to={`/photo/${item.id}`} state={{ background: location }}>
                <Photo data={item} imageSrc={item.urls.small}>
                  <PhotoUsernameHover
                    profileImg={item.user.profile_image.medium}
                    username={item.user.name}
                  />
                </Photo>
              </Link>
            </Fragment>
          ))}
        </div>
      ))}
    </>
  );
};

export default PhotoList;
