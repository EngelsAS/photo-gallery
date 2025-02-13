import { useEffect } from "react";
import { useLocation } from "react-router";

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Sempre que a URL mudar, rola para o topo

  return null;
};

export default useScrollToTop;
