import "../styles/Navbar.css";
import { AiOutlineStock } from "react-icons/ai";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <div className="navbar">
      <a href="/" style={{ textDecoration: "none", color: "white" }}>
        <h3 className="navbar-title">
          GrowwStocks <AiOutlineStock />{" "}
        </h3>
      </a>
      <SearchBar />
    </div>
  );
}
