import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import useIsScreenXs from "../../hooks/useIsScreenXs";

interface PhotoProps {
  data: Basic;
  imageSrc: string;
  children?: ReactNode;
  imageHeight?: `${number}px` | `${number}%` | number;
  imageWidth?: `${number}px` | `${number}%` | number;
  gradualLoading?: boolean;
  isFullScreen?: boolean;
  expandable?: boolean;
  objectFit?: "cover" | "contain";
}

const Photo = ({
  data,
  imageSrc,
  imageHeight,
  imageWidth,
  children,
  gradualLoading,
  isFullScreen,
  expandable,
  objectFit,
}: PhotoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurHeight, setBlurHeight] = useState(0);
  const [gradualImageLoaded, setGradualImageLoaded] = useState(false);
  const isXs = useIsScreenXs();
  const divRef = useRef<HTMLDivElement>(null);

  const handleResizeDiv = () => {
    if (divRef.current) {
      const currentWidth = divRef.current.offsetWidth;
      const newHeight = (data.height / data.width) * currentWidth;
      setBlurHeight(newHeight);
    }
  };

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setIsLoaded(true);
    };

    img.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    if (gradualLoading && data) {
      const url = data.urls.regular;

      const img = new Image();

      img.onload = () => {
        setGradualImageLoaded(true);
      };

      img.src = url;
    }
  }, [gradualLoading, data]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResizeDiv);

    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };

    //eslint-disable-next-line
  }, []);

  return (
    <div
      className={`w-full relative ${
        isFullScreen
          ? "cursor-zoom-out"
          : !isXs
          ? "cursor-zoom-in"
          : "cursor-auto"
      }`}
      ref={divRef}
      style={{
        height: imageHeight ? imageHeight : blurHeight,
        width: imageWidth ? (isLoaded ? undefined : imageWidth) : undefined,
      }}
    >
      {expandable && (
        <div className="absolute p-3 h-full w-full flex justify-end opacity-0 hover:opacity-100 transition-opacity z-50">
          {!isFullScreen ? (
            <ArrowsPointingOutIcon className="size-7 text-white" />
          ) : (
            <ArrowsPointingInIcon className="size-7 text-white" />
          )}
        </div>
      )}

      <div
        className={`w-full h-full absolute ${
          !isLoaded && !gradualImageLoaded ? "block" : "hidden"
        }`}
      >
        {data.blur_hash && (
          <Blurhash
            hash={data.blur_hash}
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        )}
      </div>

      <img
        loading="lazy"
        className={`${
          isLoaded ? "opacity-100" : "opacity-0 absolute"
        } w-full h-full ${
          objectFit === "cover" ? "object-cover" : "object-contain"
        }`}
        src={imageSrc}
      />

      {gradualLoading && (
        <img
          loading="lazy"
          className={`w-full h-full object-contain ${
            !isLoaded && gradualImageLoaded
              ? "opacity-100"
              : "opacity-0 absolute top-0"
          }`}
          src={data.urls.regular}
        />
      )}

      {isLoaded && <>{children}</>}
    </div>
  );
};

export default Photo;
