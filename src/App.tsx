import { Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Navbar from "./components/Navbar";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/product/:ticker" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
