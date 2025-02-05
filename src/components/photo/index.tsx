import { useEffect, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";
import { Link } from "react-router";
import { Basic } from "unsplash-js/dist/methods/photos/types";

const Photo = ({ data }: { data: Basic }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurHeight, setBlurHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleResizeDiv = () => {
    if (divRef.current) {
      const currentHeight = divRef.current.offsetWidth;
      const newHeight = (data.height / data.width) * currentHeight;
      setBlurHeight(newHeight);
    }
  };

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setIsLoaded(true);
    };

    img.src = data.urls.small;
  }, [data]);

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
    <Link to={`/photo/${data.id}`}>
      <div
        className="w-full relative cursor-zoom-in"
        ref={divRef}
        style={{ height: blurHeight }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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

        {isLoaded && (
          <div>
            <div
              className={`z-10 absolute w-full h-full bg-stone-950 transition-opacity ${
                isHovered ? "opacity-35" : "opacity-0"
              }`}
            ></div>
            <div
              className={`z-20 absolute flex bottom-0 p-3 items-center gap-3 transition-opacity cursor-pointer ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={data.user.profile_image.medium}
                className="w-10 h-10 rounded-full"
              ></img>
              <p className="font-semibold text-white opacity-75 hover:opacity-100 transition-opacity">
                {data.user.name}
              </p>
            </div>
          </div>
        )}
        <img
          className={`w-full object-contain ${isLoaded ? "block" : "hidden"}`}
          src={data.urls.small}
        />
      </div>
    </Link>
  );
};

export default Photo;
