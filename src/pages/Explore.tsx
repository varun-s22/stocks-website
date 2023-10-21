import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/tabs";
import Tabs from "../components/Tabs";
import { getGainersAndLosers } from "../utils/getGainersAndLosers";
import { ImSpinner } from "react-icons/im";
import "../styles/Tabs.css";
import "../styles/Explore.css";

export default function Explore() {
  const [topGainers, setTopGainers] = useState<any>([]);
  const [topLosers, setTopLosers] = useState<any>([]);

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

  useEffect(() => {
    const getData = async () => {
      const data = await getGainersAndLosers();
      setTopGainers(data.top_gainers);
      setTopLosers(data.top_losers);
    };
    getData();
  }, []);

  return (
    <div className="explore-page">
      <div className="tab-heading">
        <Tabs title="Top Gainers" />
        <Tabs title="Top Losers" />
      </div>
      {currentTab === "Top Gainers" ? (
        topGainers.length > 0 ? (
          <div className="gainers-list">
            {topGainers.map((gainer: any) => {
              return (
                <div className="gainer" key={gainer.ticker}>
                  <p>{gainer.ticker}</p>
                  <p>{gainer.price}</p>
                  <p>{gainer.change_amount}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <ImSpinner />
        )
      ) : null}

      {currentTab === "Top Losers" ? (
        topLosers.length > 0 ? (
          <div className="losers-list">
            {topLosers.map((loser: any) => {
              return (
                <div className="loser" key={loser.ticker}>
                  <p>{loser.ticker}</p>
                  <p>{loser.price}</p>
                  <p>{loser.change_amount}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <ImSpinner />
        )
      ) : null}
    </div>
  );
}
