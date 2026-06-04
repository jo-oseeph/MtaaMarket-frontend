import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { FiInfo } from "react-icons/fi";

import "./listingCard.css";

export default function ListingCard({ listing }) {
  const navigate = useNavigate();

  return (
    <div className="listing-card">

      <div className="image-wrapper">
        <img
          src={listing.images[0]}
          alt={listing.title}
        />
      </div>

      <div className="card-content">

        <h3 className="price">
          KES {listing.price.toLocaleString()}
        </h3>

        <h4 className="title">
          {listing.title}
        </h4>

        <div className="meta">

          <span>
            <FaMapMarkerAlt />
            {listing.area}, {listing.county}
          </span>

          <span>
            <IoTimeOutline />
            {listing.age}
          </span>

        </div>

        <p className="seller">
          by {listing.sellerName}
        </p>

        <button
          className="more-btn"
          onClick={() =>
            navigate(`/listing/${listing.id}`)
          }
        >
          <FiInfo />
          More Info
        </button>

      </div>

    </div>
  );
}