import "./listingCard.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { FiInfo } from "react-icons/fi";

export default function ListingCard({ listing }) {
  return (
    <div className="listing-card">

      {/* Image */}
      <div className="image-wrapper">
        <img
          src={listing.image}
          alt={listing.title}
        />
      </div>

      {/* Content */}
      <div className="card-content">

        <h3 className="price">
          KES {listing.price}
        </h3>

        <p className="title">
          {listing.title}
        </p>

        <div className="meta">
          <span>
            <FaMapMarkerAlt />
            {listing.area} • {listing.subCounty}
          </span>

          <span>
            <IoTimeOutline />
            {listing.age}
          </span>
        </div>

        <p className="seller">
          by {listing.sellerName}
        </p>

        {/* More Info Button */}
        <button className="more-btn">
          <FiInfo />
          More Info
        </button>

      </div>
    </div>
  );
}