import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import Home from "./pages/home";
import Header from "./components/header";
import Search from "./pages/search";
import PhotoPage from "./pages/photo-page";
import PhotoModal from "./components/photo-modal";
import useIsModalOpen from "./hooks/useIsModalOpen";
import { useEffect } from "react";
import useIsScreenXs from "./hooks/useIsScreenXs";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const isModalOpen = useIsModalOpen();
  const isXs = useIsScreenXs();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      <Header />
      <Routes location={isXs ? location : background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/photo/:id" element={<PhotoPage />} />
      </Routes>
      {background && !isXs && (
        <Routes>
          <Route
            path="/photo/:id"
            element={
              <PhotoModal>
                <PhotoPage />
              </PhotoModal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
