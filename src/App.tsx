import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/home";
import Header from "./components/header";
import Search from "./pages/search";
import PhotoPage from "./pages/photo-page";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/photo/:id" element={<PhotoPage />} />
      </Routes>
    </>
  );
}

export default App;
