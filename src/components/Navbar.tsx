import "../styles/Navbar.css";
import { AiOutlineStock } from "react-icons/ai";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <div className="navbar">
      <h3 div className="navbar-title">
        GrowwStocks <AiOutlineStock />{" "}
      </h3>
      <SearchBar />
    </div>
  );
}
