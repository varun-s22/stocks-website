import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import "../styles/Card.css";
interface CardProps {
  type: string;
  title: string;
  price: string;
  changeAmount: string;
  changePercentage: string;
}
export default function Card({
  type,
  title,
  price,
  changeAmount,
  changePercentage,
}: CardProps) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <div className="card-prices">
        <div>${price}</div>
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
  );
}
