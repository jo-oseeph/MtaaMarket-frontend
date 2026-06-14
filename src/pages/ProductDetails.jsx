import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListingById } from "../services/listingApi";
import { FaMapMarkerAlt, FaPhoneAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import "./productDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListingById(id);
        setListing(data);
        setActiveImage(data.images?.[0] || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) return (
    <div className="pd-loading">
      <div className="pd-spinner" />
      <p>Loading listing…</p>
    </div>
  );

  if (!listing) return (
    <div className="pd-loading">
      <p>Listing not found.</p>
    </div>
  );

  const postedDate = listing.createdAt
    ? new Date(listing.createdAt).toLocaleDateString("en-KE", {
        day: "numeric", month: "long", year: "numeric"
      })
    : "";

  return (
    <div className="pd-page">
      <div className="pd-wrapper">

        {/* ── Gallery ── */}
        <div className="pd-gallery">
          <div className="pd-main-image">
            <img src={activeImage} alt={listing.title} />
          </div>
          {listing.images?.length > 1 && (
            <div className="pd-thumbnails">
              {listing.images.map((img, i) => (
                <button
                  key={i}
                  className={`pd-thumb ${activeImage === img ? "pd-thumb--active" : ""}`}
                  onClick={() => setActiveImage(img)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Details panel ── */}
        <div className="pd-details">

          {/* Price + title */}
          <div className="pd-title-block">
            <h1 className="pd-title">{listing.title}</h1>
            <p className="pd-price">KES {listing.price?.toLocaleString()}</p>
            
          </div>

          <div className="pd-divider" />

          {/* Meta */}
          <ul className="pd-meta">
            <li>
              <FaMapMarkerAlt className="pd-meta__icon" />
              <span>{listing.area}, {listing.county}</span>
            </li>
            <li>
              <FaCalendarAlt className="pd-meta__icon" />
              <span>Posted {postedDate}</span>
            </li>
            <li>
              <FaUser className="pd-meta__icon" />
              <span>{listing.sellerName}</span>
            </li>
          </ul>

          <div className="pd-divider" />

          {/* Description */}
          <div className="pd-description">
            <h2 className="pd-section-title">Description</h2>
            <p className="pd-description__text">{listing.description}</p>
          </div>

          <div className="pd-divider" />

          {/* Contact — last */}
          <div className="pd-contact">
            <h2 className="pd-section-title">Contact seller</h2>
            <div className="pd-contact__row">
              <div className="pd-contact__info">
                <span className="pd-contact__label">Seller</span>
                <span className="pd-contact__value">{listing.sellerName}</span>
              </div>
              <div className="pd-contact__info">
                <span className="pd-contact__label">Phone</span>
                <span className="pd-contact__value">{listing.phoneNumber}</span>
              </div>
            </div>
            <a href={`tel:${listing.phoneNumber}`} className="pd-contact-btn">
              <FaPhoneAlt />
              Call {listing.sellerName}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}