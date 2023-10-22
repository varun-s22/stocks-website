import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/tabs";
import Tabs from "../components/Tabs";
import { getGainersAndLosers } from "../utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import "../styles/Tabs.css";
import "../styles/Explore.css";

export default function Explore() {
  const [topGainers, setTopGainers] = useState<any>([]);
  const [topLosers, setTopLosers] = useState<any>([]);
  const navigateTo = useNavigate();
  const query = new URLSearchParams();

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
        topGainers && topGainers.length > 0 ? (
          <div className="gainers-list">
            {topGainers.map((gainer: any) => {
              return (
                <Card
                  type="gain"
                  title={gainer.ticker}
                  price={gainer.price}
                  changeAmount={gainer.change_amount}
                  onClick={() => {
                    query.set("price", gainer.price);
                    query.set("changeAmount", gainer.change_amount);
                    query.set("changePercentage", gainer.change_percentage);
                    query.set("type", "gain");
                    navigateTo({
                      pathname: `/product/${gainer.ticker}`,
                      search: query.toString(),
                    });
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className="loading-spinner">
            <AiOutlineLoading3Quarters
              style={{ width: "5%", height: "5%", color: "#96591b" }}
            />
          </div>
        )
      ) : null}

      {currentTab === "Top Losers" ? (
        topLosers && topLosers.length > 0 ? (
          <div className="losers-list">
            {topLosers.map((loser: any) => {
              return (
                <Card
                  type="loss"
                  title={loser.ticker}
                  price={loser.price}
                  changeAmount={loser.change_amount}
                  onClick={() => {
                    navigateTo(`/product/${loser.ticker}`);
                    query.set("price", loser.price);
                    query.set("changeAmount", loser.change_amount);
                    query.set("changePercentage", loser.change_percentage);
                    query.set("type", "loss");
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className="loading-spinner">
            <AiOutlineLoading3Quarters
              style={{ width: "5%", height: "5%", color: "#96591b" }}
            />
          </div>
        )
      ) : null}
    </div>
  );
}
