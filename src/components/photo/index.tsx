import { useEffect, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";
import { Basic } from "unsplash-js/dist/methods/photos/types";

const Photo = ({ data }: { data: Basic }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setIsLoaded(true);
    };

    img.src = data.urls.small;
  }, [data]);

  const divRef = useRef(null);

  return (
    <div className="w-full relative min-h-60">
      {!isLoaded && (
        <div className="w-full h-full absolute" ref={divRef}>
          <Blurhash
            hash={data.blur_hash || ""}
            width="100%"
            height={"100%"}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      )}

      {isLoaded && (
        <img
          className="w-full object-contain"
          loading="lazy"
          src={data.urls.small}
        />
      )}
    </div>
  );
};

export default Photo;
