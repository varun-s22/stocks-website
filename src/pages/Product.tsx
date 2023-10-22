import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getCompanyOverview } from "../utils";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import "../styles/Product.css";
import "../styles/Card.css";
import Chip from "../components/Chip";
import LineChart from "../components/Chart";
import { BsFacebook } from "react-icons/bs";

export default function Product() {
  const { ticker } = useParams<string>();
  const [companyOverview, setCompanyOverview] = useState<any>({});
  const [searchParams] = useSearchParams();
  const { price, changeAmount, changePercentage, type } =
    Object.fromEntries(searchParams);
  useEffect(() => {
    const getData = async () => {
      const data = await getCompanyOverview(ticker || "");
      setCompanyOverview(data);
    };
    getData();
  }, []);

  return (
    <div className="product">
      <div className="product-segment-1">
        <div className="product-segment-2">
          <BsFacebook
            style={{
              width: "50%",
              height: "50%",
              border: "2px solid #cacccb",
              borderRadius: "50%",
              padding: "10px",
              marginRight: "10px",
            }}
          />
          <div>
            <h2 className="bold-text">{companyOverview.Name}</h2>
            <h4 className="bold-text">
              {companyOverview.Symbol}, {companyOverview.AssetType}
            </h4>
            <h4 className="bold-text">{companyOverview.Exchange}</h4>
          </div>
        </div>
        <div>
          <h3 className="product-price">$ {price}</h3>
          <div className={`changeAmount-${type}`}>
            {type === "gain" && "+"}
            {changeAmount}
            {type === "gain" ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
          </div>
          <div className={`changeAmount-${type}`}>
            ({parseFloat(changePercentage).toFixed(2)}%)
          </div>
        </div>
      </div>
      <LineChart />
      <div className="product-description">
        <h3 className="product-description-heading">
          About {companyOverview["Name"]}
        </h3>
        <div>{companyOverview.Description}</div>
        <div className="product-chips">
          <Chip label="Industry" value={companyOverview.Industry} />
          <Chip label="Sector" value={companyOverview.Sector} />
        </div>
        <div className="product-prices">
          <div>
            52-Week Low
            <h4>{companyOverview["52WeekLow"]}</h4>
          </div>
          <div className="number-line-parent-div">
            Current Price: ${price}
            <BiSolidDownArrow />
            <hr></hr>
          </div>
          <div>
            52-Week High
            <h4>{companyOverview["52WeekHigh"]}</h4>
          </div>
        </div>
        <div className="product-others">
          <div>
            Market Cap
            <h4 className="bold-text">
              {companyOverview.MarketCapitalization}
            </h4>
          </div>
          <div>
            P/E Ratio
            <h4 className="bold-text">{companyOverview.PERatio}</h4>
          </div>
          <div>
            Beta
            <h4 className="bold-text">{companyOverview.Beta}</h4>
          </div>
          <div>
            Dividend Yield
            <h4 className="bold-text">{companyOverview.DividendYield}</h4>
          </div>
          <div>
            Profit Margin
            <h4 className="bold-text">{companyOverview.ProfitMargin}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
