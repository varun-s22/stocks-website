import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import "../styles/Card.css";
interface CardProps {
  type: string;
  title: string;
  price: string;
  changeAmount: string;
  onClick: () => void;
}
export default function Card({
  type,
  title,
  price,
  changeAmount,
  onClick,
}: CardProps) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-icon-parent">
        <BsFacebook
          style={{
            width: "30%",
            height: "50%",
            border: "2px solid #cacccb",
            borderRadius: "50%",
            padding: "10px",
          }}
        />
        <h4 className="bold-text">{title}</h4>
      </div>
      <div className="card-prices">
        <div>${price}</div>
        <div className={`changeAmount-${type}`}>
          {type === "gain" && "+"}
          {changeAmount}
          {type === "gain" ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
        </div>
      </div>
    </div>
  );
}
