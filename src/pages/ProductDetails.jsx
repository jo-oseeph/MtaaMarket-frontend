import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getListingById } from "../services/listingApi";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

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

  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found</p>;

  return (
    <div className="product-page">

      <div className="product-container">

        {/* LEFT */}
        <div className="gallery">

          <div className="main-image">
            <img src={activeImage} alt={listing.title} />
          </div>

          <div className="thumbnails">
            {listing.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>

        </div>

        {/* RIGHT */}
        <div className="product-info">

          <h2 className="price">
            KES {listing.price?.toLocaleString()}
          </h2>

          <h1>{listing.title}</h1>

          <p className="location">
            <FaMapMarkerAlt />
            {listing.area}, {listing.county}
          </p>

          <p>Posted: {listing.createdAt ? new Date(listing.createdAt).toDateString() : ""}</p>

          <p>Seller: {listing.sellerName}</p>

          <div className="contact-box">
            <p>{listing.phoneNumber}</p>

            <a
              href={`tel:${listing.phoneNumber}`}
              className="contact-btn"
            >
              <FaPhoneAlt />
              Contact Owner
            </a>
          </div>

        </div>

      </div>

      {/* DESCRIPTION */}
      <section className="description-section">
        <h3>Description</h3>
        <p>{listing.description}</p>
      </section>

    </div>
  );
}