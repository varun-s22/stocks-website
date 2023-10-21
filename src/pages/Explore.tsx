import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/tabs";
import Tabs from "../components/Tabs";
import "../styles/Tabs.css";
import "../styles/Explore.css";

export default function Explore() {
  const currentTab = useSelector((state: any) => {
    return state.tabs.tabs;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const storedTab = localStorage.getItem("tab");
    if (storedTab) {
      dispatch(update(storedTab));
      const selectedTab = document.getElementById(`${storedTab}`);
      selectedTab?.classList.add("active");
    }
  }, []);

  return (
    <div className="explore-page">
      <div className="tab-heading">
        <Tabs title="Top Gainers" />
        <Tabs title="Top Losers" />
      </div>
      {currentTab === "Top Gainers" && <h1>Gainers list</h1>}
      {currentTab === "Top Losers" && <h1>Losers list</h1>}
    </div>
  );
}
