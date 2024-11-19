import { Link } from "react-router-dom";
import { Ad } from "../generated/graphql-types";

const AdCard = ({ title, price, pictures, id }: Ad) => (
  <div className="ad-card-container">
    <Link className="ad-card-link" to={`/ad/${id}`}>
      <img className="ad-card-image" src={pictures?.at(0)?.url} />
      <div className="ad-card-text">
        <div className="ad-card-title">{title}</div>
        <div className="ad-card-price">{price} €</div>
      </div>
    </Link>
  </div>
);

export default AdCard;
