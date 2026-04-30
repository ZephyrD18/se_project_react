import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <button type="button" className="card" onClick={() => onCardClick(item)}>
      <span className="card__name">{item.name}</span>
      <img src={item.imageUrl} alt={item.name} className="card__image" />
    </button>
  );
}

export default ItemCard;
