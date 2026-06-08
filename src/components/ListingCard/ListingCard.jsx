import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
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
        <img src={image} alt={listing.title} />
      </div>

      <div className="card-content">
        <h3 className="price">KES {listing.price?.toLocaleString()}</h3>
        <h4 className="title">{listing.title}</h4>

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

        <div className="card-footer">
          <p className="seller">by {listing.sellerName}</p>
          <button
            className="more-btn"
            onClick={() => navigate(`/listing/${listing._id}`)}
            title="More Info"
          >
            <FiInfo />
          </button>
        </div>
      </div>
    </div>
  );
}