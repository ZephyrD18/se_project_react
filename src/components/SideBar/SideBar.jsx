import { useContext } from "react";
import "./SideBar.css";
import Avatar from "../Avatar/Avatar";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfileClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser.name || "";

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        <Avatar
          name={userName}
          avatarUrl={currentUser.avatar}
          imageClassName="sidebar__avatar"
          placeholderClassName="sidebar__avatar-placeholder"
        />
        <p className="sidebar__username">{userName}</p>
      </div>

      <button
        type="button"
        className="sidebar__edit-btn"
        onClick={onEditProfileClick}
      >
        Edit profile
      </button>

      <button
        type="button"
        className="sidebar__signout-btn"
        onClick={onSignOut}
      >
        Sign out
      </button>
    </aside>
  );
}

export default SideBar;
