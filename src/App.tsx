import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/home";
import Header from "./components/header";
import Search from "./pages/search";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:query" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
