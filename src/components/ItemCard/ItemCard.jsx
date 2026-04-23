import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const imageClassName = `card__image card__image_type_${item.name
    .toLowerCase()
    .replace("-", "")
    .replace(/\s+/g, "")}`;

  return (
    <article className="card" onClick={() => onCardClick(item)}>
      <h2 className="card__name">{item.name}</h2>
      <img src={item.imageUrl} alt={item.name} className={imageClassName} />
    </article>
  );
}

export default ItemCard;
