import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  onCardClick,
  onCardLike,
  onAddClick,
  onEditProfileClick,
  onSignOut,
  isLoggedIn,
}) {
  return (
    <main className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onSignOut={onSignOut} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onAddClick={onAddClick}
        isLoggedIn={isLoggedIn}
      />
    </main>
  );
}

export default Profile;
