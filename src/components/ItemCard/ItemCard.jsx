import { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getItemId } from "../../utils/item";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const likes = Array.isArray(item.likes) ? item.likes : [];
  const isLiked = likes.some((like) => {
    const userId = typeof like === "object" ? like?._id : like;

    return (
      userId !== undefined &&
      currentUser._id !== undefined &&
      String(userId) === String(currentUser._id)
    );
  });
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;
  const usesIntrinsicCanvas = /\/Sneakers\.(?:png|svg)(?:\?|$)/i.test(
    item.imageUrl,
  );

  const handleClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: getItemId(item), isLiked });
  };

  return (
    <article className="card" aria-label={item.name}>
      <button
        type="button"
        className="card__preview-btn"
        onClick={handleClick}
        aria-label={`View ${item.name}`}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className={`card__image ${
            usesIntrinsicCanvas ? "card__image_type_intrinsic" : ""
          }`}
        />
      </button>

      <div className="card__info">
        <span className="card__name">{item.name}</span>

        {isLoggedIn && currentUser._id && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLike}
            aria-label={isLiked ? `Unlike ${item.name}` : `Like ${item.name}`}
            aria-pressed={isLiked}
          >
            <span className="card__like-icon" aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
}

export default ItemCard;
