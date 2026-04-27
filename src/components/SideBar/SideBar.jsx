import "./SideBar.css";
import avatar from "../../assets/Avatar.svg";

function SideBar() {
  return (
    <aside className="sidebar">
      <img src={avatar} alt="User avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegene</p>
    </aside>
  );
}

export default SideBar;
