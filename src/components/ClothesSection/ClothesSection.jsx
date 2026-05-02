import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardClick, onAddClick }) {
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
        {clothingItems.map((item) => (
          <li key={item._id ?? item.id} className="clothes-section__card-item">
            <ItemCard item={item} onCardClick={onCardClick} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
