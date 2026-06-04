import { useParams } from "react-router-dom";
import { useState } from "react";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

import "./productDetails.css";

export default function ProductDetails() {

  const { id } = useParams();

  const listing = {
    id,
    title: "Samsung 55 Inch Smart TV",

    price: 35000,

    county: "Nairobi",
    area: "Mwiki",

    sellerName: "Brian",

    phoneNumber: "0712345678",

    age: "2 days ago",

    category: "Electronics",

    description:
      "Selling a Samsung 55-inch Smart TV in excellent condition. All ports working perfectly and remote included.",

    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6",
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79"
    ]
  };

  const [activeImage, setActiveImage] =
    useState(listing.images[0]);

  return (
    <div className="product-page">

      <div className="product-container">

        {/* Left */}

        <div className="gallery">

          <div className="main-image">
            <img
              src={activeImage}
              alt={listing.title}
            />
          </div>

          <div className="thumbnails">

            {listing.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() =>
                  setActiveImage(img)
                }
              />
            ))}

          </div>

        </div>

        {/* Right */}

        <div className="product-info">

          <h2 className="price">
            KES {listing.price.toLocaleString()}
          </h2>

          <h1>{listing.title}</h1>

          <p className="location">
            <FaMapMarkerAlt />
            {listing.area}, {listing.county}
          </p>

          <p>
            Category: {listing.category}
          </p>

          <p>
            Posted: {listing.age}
          </p>

          <p>
            Seller: {listing.sellerName}
          </p>

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

      {/* Description */}

      <section className="description-section">

        <h3>Description</h3>

        <p>{listing.description}</p>

      </section>

    </div>
  );
}