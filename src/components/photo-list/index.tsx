import { Basic } from "unsplash-js/dist/methods/photos/types";
import Photo from "../photo";
import { Link, useLocation } from "react-router";
import PhotoUsernameHover from "../photo-username-hover";
import { Dispatch, Fragment, SetStateAction, useEffect, useRef } from "react";
import useIsScreenXs from "../../hooks/useIsScreenXs";

interface PhotoListProps {
  columns: Basic[][];
  observerFunction?: () => void;
  setColumnWidth: Dispatch<SetStateAction<number>>;
}

const PhotoList = ({
  columns,
  observerFunction,
  setColumnWidth,
}: PhotoListProps) => {
  const location = useLocation();
  const columnRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const resizeRef = useRef<ResizeObserver | null>(null);
  const lastDivRef = useRef<HTMLDivElement | null>(null);
  const isXs = useIsScreenXs();

  useEffect(() => {
    if (!observerRef) return;

    return () => observerRef.current?.disconnect();
  }, []);

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

  useEffect(() => {
    if (isXs && observerRef.current) {
      observerRef.current.disconnect();
    }

    if (!isXs && lastDivRef.current && observerFunction) {
      observerFunction();
    }

    //eslint-disable-next-line
  }, [isXs]);

  const createObserver = (element: HTMLDivElement) => {
    if (!element || !observerFunction) return;

    lastDivRef.current = element;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observerFunction();
        }
      },
      {
        rootMargin: "50%",
      }
    );

    observerRef.current.observe(element);
  };

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
              {!isXs && (
                <>
                  {internArrayIndex === internArray.length - 1 && (
                    <div ref={createObserver}></div>
                  )}
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
