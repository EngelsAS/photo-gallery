import { useLocation } from "react-router";

const useIsModalOpen = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const isModalOpen = background && location.pathname.startsWith("/photo/");

  return isModalOpen;
};

export default useIsModalOpen;
