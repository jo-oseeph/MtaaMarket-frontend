import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard/ListingCard";
import { getListings } from "../services/listingApi";
import Hero from "../components/Hero";
import "./home.css";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <Hero />
      <h2 className="section-title">
        Featured Listings
      </h2>

      <div className="grid">
        {listings.slice(0, 3).map((item) => (
          <ListingCard
            key={item._id || item.id}
            listing={item}
          />
        ))}
      </div>

    </div>
  );
}