import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/home";
import Header from "./components/header";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
