import { Basic } from "unsplash-js/dist/methods/photos/types";
import Photo from "../photo";
import { Link, useLocation } from "react-router";
import PhotoUsernameHover from "../photo-username-hover";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import useIsScreenXs from "../../hooks/useIsScreenXs";
import Avatar from "../avatar";
import { ArrowDownTrayIcon, HeartIcon } from "@heroicons/react/24/outline";
import { downloadImage } from "../../api/downloadImage";
import LoadingButton from "../loading-button";

interface PhotoListProps {
  columns: Basic[][];
  setColumnWidth: Dispatch<SetStateAction<number>>;
}

const PhotoList = ({ columns, setColumnWidth }: PhotoListProps) => {
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
  const location = useLocation();
  const columnRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<ResizeObserver | null>(null);
  const isXs = useIsScreenXs();

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

  const handleDownload = async (downloadUrl: string, photoId: string) => {
    setIsLoadingDownload(true);
    try {
      await downloadImage(downloadUrl, photoId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDownload(false);
    }
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
            <div key={internArrayIndex}>
              <div className="flex sm:hidden p-2  gap-3 items-center">
                <Avatar src={item.user.profile_image.medium} />
                <div>
                  <p className="font-semibold">{item.user.name}</p>
                  <p className="text-zinc-500 text-xs">
                    publicada no{" "}
                    <a
                      className="underline hover:text-cyan-600 transition-colors"
                      href="https://unsplash.com/"
                      target="_blank"
                    >
                      unsplash
                    </a>
                  </p>
                </div>
              </div>

              <Link to={`/photo/${item.id}`} state={{ background: location }}>
                <Photo data={item} imageSrc={item.urls.regular}>
                  {!isXs && (
                    <PhotoUsernameHover
                      profileImg={item.user.profile_image.medium}
                      username={item.user.name}
                    />
                  )}
                </Photo>
              </Link>

              <div className="flex sm:hidden justify-between p-2 items-center">
                <div className="flex items-center">
                  <HeartIcon className="size-6" />
                  <p>{item.likes}</p>
                </div>
                <LoadingButton
                  onClick={() =>
                    handleDownload(item.links.download_location, item.id)
                  }
                  isLoading={isLoadingDownload}
                >
                  <ArrowDownTrayIcon className="size-7" />
                </LoadingButton>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default PhotoList;
