import { AiOutlineLoading3Quarters, AiOutlineSearch } from "react-icons/ai";
import "../styles/SearchBar.css";
import { GiCancel } from "react-icons/gi";
import { useRef, useState } from "react";
import { getSearchResults } from "../utils";

let startTimer: any;
export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showCancelBtn, setShowCancelBtn] = useState<boolean>(false);
  const [matches, setMatches] = useState<any>([]);

  const onChange = (e: any) => {
    const keyword = e.target.value;
    setShowCancelBtn(keyword && keyword.length > 0);
    clearInterval(startTimer);
    startTimer = setInterval(async () => {
      if (keyword) {
        const data = await getSearchResults(keyword);
        setMatches(data);
      }
      return null;
    }, 3000);
  };

  return (
    <div className="searchbar">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a stock"
        onChange={onChange}
      />
      <AiOutlineSearch
        className="search-icon"
        style={{
          width: "20px",
          height: "20px",
          position: "absolute",
          left: "10px",
          color: "black",
        }}
      />
      {showCancelBtn && (
        <GiCancel
          onClick={() => {
            clearInterval(startTimer);
            startTimer = null;
            inputRef.current!.value = "";
            setShowCancelBtn(false);
          }}
          style={{
            width: "20px",
            height: "20px",
            position: "absolute",
            left: "72%",
            cursor: "pointer",
            color: "black",
          }}
        />
      )}
      {showCancelBtn && (
        <div className="search-results">
          {matches && matches.length > 0 ? (
            matches.map((match: any) => {
              return <div className="search-result">{match["2. name"]}</div>;
            })
          ) : (
            <div className="loading-spinner">
              <AiOutlineLoading3Quarters />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
