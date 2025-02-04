import { useEffect, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";
import { Basic } from "unsplash-js/dist/methods/photos/types";

interface PhotoListProps {
  columns: Basic[][];
}

const PhotoList = ({ columns }: PhotoListProps) => {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const divRef = useRef(null);

  useEffect(() => {
    console.log("AAAAAAAAAA");
    console.log(loadedImages);
  }, [loadedImages]);

  if (columns.length === 0) {
    return <div>...</div>;
  }

  const content = columns.map((internArray, indexMainArray) => (
    <div
      className={`flex flex-col grow gap-3 max-w-[418px]`}
      key={indexMainArray}
    >
      {internArray.map((item, internArrayIndex) => (
        <div key={internArrayIndex} className="w-full relative min-h-60">
          <div className="w-full h-full absolute border-2" ref={divRef}>
            <Blurhash
              hash={item.blur_hash || ""}
              width="100%"
              height={"100%"}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          </div>

          <img
            className="w-full object-contain"
            loading="lazy"
            src={item.urls.regular}
            onLoad={() => {
              setLoadedImages((prev) => [...prev, item.id]);
            }}
          />
        </div>
      ))}
    </div>
  ));

  return (
    <>
      <button onClick={() => console.log(divRef)}>console</button>
      {content}
    </>
  );
};

export default PhotoList;
