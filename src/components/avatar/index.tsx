import { useEffect, useState } from "react";

const Avatar = ({ src }: { src?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = src;
  }, [src]);

  return (
    <div>
      <div
        className={`w-10 h-10 rounded-full animate-pulse bg-zinc-200 ${
          !isLoaded ? "block" : "hidden"
        }`}
      ></div>
      <img
        src={src}
        className={`w-10 h-10 rounded-full ${isLoaded ? "block" : "hidden"}`}
      />
    </div>
  );
};

export default Avatar;
