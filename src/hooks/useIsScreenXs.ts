import { useEffect, useState } from "react";

const useIsScreenXs = () => {
  const [isXs, setIsXs] = useState(window.innerWidth < 640);

  useEffect(() => {
    let timeout: number;

    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsXs(window.innerWidth < 640);
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isXs;
};

export default useIsScreenXs;
