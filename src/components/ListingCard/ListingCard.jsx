import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import "./listingCard.css";

export default function ListingCard({ listing }) {
  const navigate = useNavigate();

  const image =
    listing.images?.[0] ||
    "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div className="listing-card">
      <div className="image-wrapper">
        <img src={image} alt={listing.title} loading="lazy" />
      </div>

      <div className="card-content">
        <h4 className="title">{listing.title}</h4>
        <h3 className="price">KES {listing.price?.toLocaleString()}</h3>

        <div className="location">
          <FaMapMarkerAlt />
          <span>{listing.area}, {listing.county}</span>
        </div>

        <div className="card-footer">
          <div className="seller">
            <FaUserCircle />
            <span>{listing.sellerName}</span>
          </div>
          <button
            className="more-btn"
            onClick={() => navigate(`/listing/${listing._id}`)}
            title="View Details"
            aria-label="View listing details"
          >
            <FiInfo />
          </button>
        </div>
      </div>
    </div>
  );
}