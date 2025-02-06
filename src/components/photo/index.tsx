import { ReactNode, useEffect, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";
import { Basic } from "unsplash-js/dist/methods/photos/types";

interface PhotoProps {
  data: Basic;
  imageSrc: string;
  children?: ReactNode;
  imageHeight?: `${number}px` | `${number}%`;
}

const Photo = ({ data, imageSrc, imageHeight, children }: PhotoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurHeight, setBlurHeight] = useState(0);
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
    const resizeObserver = new ResizeObserver(handleResizeDiv);

    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(imageHeight);
  }, [imageHeight]);

  return (
    <div
      className="w-full relative cursor-zoom-in"
      ref={divRef}
      style={{ height: imageHeight ? imageHeight : blurHeight }}
    >
      <div
        className={`w-full h-full absolute ${!isLoaded ? "block" : "hidden"}`}
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

      {isLoaded && <>{children}</>}
    </div>
  );
};

export default Photo;
