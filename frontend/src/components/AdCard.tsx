export type AdCardProps = {
  id: number;
  title: string;
  link: string;
  price: number;
  picture: string;
  category: { id: number; title: string };
};

const AdCard = ({ title, link, price, picture, category }: AdCardProps) => (
  <div className="ad-card-container">
    <a className="ad-card-link" href={link}>
      <img className="ad-card-image" src={picture} />
      <div className="ad-card-text">
        <div className="ad-card-title">{title}</div>
        <div className="ad-card-price">{price} €</div>
        <div className="ad-card-category">{category.title}</div>
      </div>
    </a>
  </div>
);

export default AdCard;
