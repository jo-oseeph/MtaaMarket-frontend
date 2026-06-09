import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ListingCard from "../components/ListingCard/ListingCard";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import WhyChoose from "../components/WhyChoose";


import { getListings } from "../services/listingApi";

import "./home.css";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchListings();
  }, []);

  return (
    <>
      <Hero />

      <main className="home">
        <section className="featured-section">
          <div className="section-header">
            <h2 className="section-title">
              Featured Listings
            </h2>

            <p className="section-subtitle">
              Discover recently approved items from sellers near you.
              Find great deals on electronics, furniture, fashion,
              appliances, and more.
            </p>
          </div>

          <div className="grid">
            {listings.slice(0, 3).map((item) => (
              <ListingCard
                key={item._id}
                listing={item}
              />
            ))}
          </div>

          <div className="view-more-wrapper">
            <Link
              to="/items"
              className="view-more-btn"
            >
              View More Listings
            </Link>
          </div>
        </section>
      </main>

      <HowItWorks />
      <WhyChoose />
    </>
  );
}