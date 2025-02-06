import { ReactNode, useEffect, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";
import { Basic } from "unsplash-js/dist/methods/photos/types";

interface PhotoProps {
  data: Basic;
  imageSrc: string;
  children?: ReactNode;
  imageHeight?: `${number}px` | `${number}%` | number;
  imageWidth?: `${number}px` | `${number}%` | number;
  gradualLoading?: boolean;
}

const Photo = ({
  data,
  imageSrc,
  imageHeight,
  imageWidth,
  children,
  gradualLoading,
}: PhotoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurHeight, setBlurHeight] = useState(0);
  const [gradualImagesUrls, setGradualImagesUrls] = useState<string[]>([]);
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
    if (gradualLoading && data && imageSrc) {
      const urls = Object.values(data.urls);
      const imageSources = urls.filter((item) => item !== imageSrc);

      for (const src of imageSources) {
        const img = new Image();

        img.onload = () => {
          setGradualImagesUrls((prev) => [...prev, src]);
        };

        img.src = src;
      }
    }
  }, [gradualLoading, data, imageSrc]);

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
      className="w-full relative cursor-zoom-in"
      ref={divRef}
      style={{
        height: imageHeight ? imageHeight : blurHeight,
        width: imageWidth ? (isLoaded ? undefined : imageWidth) : undefined,
      }}
    >
      <div
        className={`w-full h-full absolute ${
          !isLoaded && gradualImagesUrls.length === 0 ? "block" : "hidden"
        }`}
      >
        <Blurhash
          hash={data.blur_hash || ""}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>

      <img
        className={`w-full h-full object-contain ${
          isLoaded ? "block" : "hidden"
        }`}
        src={imageSrc}
      />

      {gradualLoading && (
        <img
          className={`w-full h-full object-contain ${
            !isLoaded && gradualImagesUrls.length > 0 ? "block" : "hidden"
          }`}
          src={gradualImagesUrls[gradualImagesUrls.length - 1]}
        />
      )}

      {isLoaded && <>{children}</>}
    </div>
  );
};

export default Photo;
