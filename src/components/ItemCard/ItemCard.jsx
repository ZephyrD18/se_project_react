import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <article className="card" onClick={() => onCardClick(item)}>
      <h2 className="card__name">{item.name}</h2>
      <img src={item.link} alt={item.name} className="card__image" />
    </article>
  );
}

export default ItemCard;