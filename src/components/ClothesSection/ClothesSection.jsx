import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { getItemId } from "../../utils/item";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  onCardClick,
  onCardLike,
  onAddClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userClothingItems = clothingItems.filter((item) => {
    const ownerId =
      typeof item.owner === "object" ? item.owner?._id : item.owner;

    return Boolean(currentUser._id && ownerId === currentUser._id);
  });

  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h1 className="clothes-section__title">Your items</h1>
        <button
          type="button"
          className="clothes-section__add-btn"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>

      <ul className="clothes-section__cards-list">
        {userClothingItems.map((item) => (
          <li key={getItemId(item)} className="clothes-section__card-item">
            <ItemCard
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
