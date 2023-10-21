import { useDispatch } from "react-redux";
import { update } from "../redux/tabs";
import "../styles/Tabs.css";

export interface TabsProps {
  title: string;
}

export default function Tabs({ title }: TabsProps) {
  const dispatch = useDispatch();

  const handleTabSelection = () => {
    localStorage.setItem("tab", title);
    dispatch(update(title));

    // add a active class to selected tab
    const tabs = document.querySelectorAll(".tabs");
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    const selectedTab = document.getElementById(`${title}`);
    selectedTab?.classList.add("active");
  };

  return (
    <h3 className="tabs" onClick={handleTabSelection} id={title}>
      {title}
    </h3>
  );
}
