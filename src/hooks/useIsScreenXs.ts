import { useEffect, useState } from "react";

const useIsScreenXs = () => {
  const [isXs, setIsXs] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
      setIsXs(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return isXs;
};

export default useIsScreenXs;
