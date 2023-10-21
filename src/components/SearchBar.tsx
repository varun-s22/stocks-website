import { AiOutlineSearch } from "react-icons/ai";
import "../styles/SearchBar.css";

export default function SearchBar() {
  return (
    <div className="searchbar">
      <input type="text" placeholder="Search for a stock" />
      <AiOutlineSearch
        className="search-icon"
        style={{
          width: "20px",
          height: "20px",
          position: "absolute",
          left: "10px",
        }}
      />
    </div>
  );
}
